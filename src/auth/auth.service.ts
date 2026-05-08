// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';

interface JwtPayload {
  sub: number;
  role: string; // or your Role enum as string
}

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async register(dto: RegisterDto) {
    const hashed = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user.create({
      data: { ...dto, password: hashed },
    });
    return { id: user.id, email: user.email };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const match = await bcrypt.compare(dto.password, user.password);
    if (!match) throw new UnauthorizedException('Invalid credentials');

    // Access token
    const accessToken = this.jwtService.sign<JwtPayload>(
      { sub: user.id, role: user.role },
      {
        expiresIn: this.config.get<string>('JWT_EXPIRES_IN') as
          | '30m'
          | '45m'
          | '2h', // type-safe cast
        secret: this.config.get<string>('JWT_SECRET')!, // assert non-null
      },
    );

    // Refresh token
    const refreshToken = this.jwtService.sign<JwtPayload>(
      { sub: user.id, role: user.role },
      {
        expiresIn: this.config.get<string>('JWT_REFRESH_EXPIRES_IN') as
          | '2h'
          | '1h',
        secret: this.config.get<string>('JWT_REFRESH_SECRET')!,
      },
    );

    // Save refresh token in DB
    await this.prisma.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });

    return { access_token: accessToken, refresh_token: refreshToken };
  }

  async refreshTokens(userId: number, oldRefreshToken: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user || user.refreshToken !== oldRefreshToken)
      throw new UnauthorizedException('Invalid refresh token');

    const accessToken = this.jwtService.sign<JwtPayload>(
      { sub: user.id, role: user.role },
      {
        expiresIn: this.config.get<string>('JWT_EXPIRES_IN') as
          | '30m'
          | '45m'
          | '2h', // type-safe cast
        secret: this.config.get<string>('JWT_SECRET')!, // assert non-null
      },
    );

    const refreshToken = this.jwtService.sign<JwtPayload>(
      { sub: user.id, role: user.role },
      {
        expiresIn: this.config.get<string>('JWT_REFRESH_EXPIRES_IN') as
          | '2h'
          | '1h',
        secret: this.config.get<string>('JWT_REFRESH_SECRET')!,
      },
    );

    await this.prisma.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });

    return { access_token: accessToken, refresh_token: refreshToken };
  }
}

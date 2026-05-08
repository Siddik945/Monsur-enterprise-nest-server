// src/user/user.controller.ts
import { Controller, Get, Put, Body, UseGuards, Req } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private prisma: PrismaService) {}

  @Get('profile')
  async getProfile(@Req() req: Request) {
    return this.prisma.user.findUnique({
      where: { id: (req.user as any).sub },
    });
  }

  @Put('profile')
  async updateProfile(
    @Req() req: Request,
    @Body() body: { name?: string; email?: string },
  ) {
    return this.prisma.user.update({
      where: { id: (req.user as any).sub },
      data: body,
    });
  }
}

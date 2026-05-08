import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Role } from './role.enum';

export class CreateAdminDto {
  @ApiProperty({ example: 'admin@monsur.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @MinLength(6)
  password!: string;

  @ApiProperty({ example: 'ADMIN', enum: Role, default: Role.USER })
  @IsEnum(Role)
  @IsOptional()
  role?: Role; // default USER
}

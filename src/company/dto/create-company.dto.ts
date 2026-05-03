import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateCompanyDto {
  @ApiProperty({ example: 'Monsur Enterprise' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ example: '123 Main St, Dhaka' })
  @IsString()
  @IsNotEmpty()
  address!: string;

  @ApiProperty({ example: 'Contact-0123456789' })
  @IsString()
  @IsNotEmpty()
  contact!: string;

  @ApiProperty({ example: 'info@monsur.com' })
  @IsEmail()
  email!: string;
}

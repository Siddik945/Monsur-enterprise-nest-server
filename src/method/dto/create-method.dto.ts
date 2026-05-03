import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateMethodDto {
  @ApiProperty({ example: 'Bank Transfer' })
  @IsString()
  @IsNotEmpty()
  name!: string;
}

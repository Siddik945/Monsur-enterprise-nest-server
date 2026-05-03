import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsDateString, IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty()
  @IsInt()
  siteId!: number;

  @ApiProperty()
  @IsInt()
  categoriesId!: number;

  @ApiProperty({ example: 'pending' })
  @IsString()
  @IsNotEmpty()
  status!: string;

  @ApiProperty({ example: '2024-01-15' })
  @IsDateString()
  date!: string;
}

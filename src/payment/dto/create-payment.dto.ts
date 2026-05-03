import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsDateString } from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty()
  @IsInt()
  companyId!: number;

  @ApiProperty()
  @IsInt()
  methodId!: number;

  @ApiProperty({ example: '2024-01-15' })
  @IsDateString()
  date!: string;

  @ApiProperty({ example: 50000.0 })
  @IsNumber()
  amount!: number;
}

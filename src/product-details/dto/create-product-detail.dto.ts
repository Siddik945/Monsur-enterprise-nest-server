import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsString,
  IsInt,
  IsNumber,
  IsDateString,
  IsNotEmpty,
} from 'class-validator';
export class CreateProductDetailDto {
  @ApiProperty()
  @IsInt()
  orderId!: number;

  @ApiProperty()
  @IsInt()
  companyId!: number;

  @ApiProperty()
  @IsInt()
  siteId!: number;

  @ApiProperty()
  @IsInt()
  categoriesId!: number;

  @ApiProperty()
  @IsInt()
  contractId!: number;

  @ApiProperty({ example: '2024-01-15' })
  @IsDateString()
  date!: string;

  @ApiProperty({ example: 'Challan-001' })
  @IsString()
  @IsNotEmpty()
  challanNo!: string;

  @ApiProperty() @IsNumber() buyingQuantity!: number;
  @ApiProperty() @IsNumber() buyingPricePerCft!: number;
  @ApiProperty() @IsNumber() rentCost!: number;
  @ApiProperty() @IsNumber() labourCost!: number;
  @ApiProperty() @IsNumber() otherCost!: number;
  @ApiProperty() @IsNumber() sellingQuantity!: number;
  @ApiProperty() @IsString() status!: string;
  // @ApiProperty() @IsNumber() totalPrice!: number;
  // @ApiProperty() @IsNumber() totalCost!: number;
  // @ApiProperty() @IsNumber() profit!: number;
}

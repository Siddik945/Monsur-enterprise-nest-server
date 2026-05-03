import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsDateString, IsNotEmpty, Min } from 'class-validator';

export class CreateContractDto {
  @ApiProperty({
    example: '2024-01-15',
    description: 'Contract start date (YYYY-MM-DD)',
  })
  @IsDateString()
  date!: string;

  @ApiProperty({
    example: 1,
    description: 'ID of the company signing the contract',
  })
  @IsInt()
  companyId!: number;

  @ApiProperty({
    example: 1,
    description: 'ID of the site covered by this contract',
  })
  @IsInt()
  siteId!: number;

  @ApiProperty({
    example: 1,
    description: 'ID of the product category covered',
  })
  @IsInt()
  productCategoriesId!: number;

  @ApiProperty({
    example: 500,
    description: 'Agreed rate per cubic foot (cft)',
    minimum: 0,
  })
  @IsInt()
  @Min(0)
  rate!: number;
}

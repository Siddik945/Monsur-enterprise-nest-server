import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateProductCategoryDto {
  @ApiProperty({ example: 'Scaffolding' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({
    example: 'Temporary structure used in construction',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;
}

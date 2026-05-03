import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsNotEmpty } from 'class-validator';

export class CreateSiteDto {
  @ApiProperty()
  @IsInt()
  companyId!: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  address!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  engrName!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  engrContact!: string;
}

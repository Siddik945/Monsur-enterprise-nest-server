import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ContractService } from './contract.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';

@ApiTags('Contracts')
@Controller('contracts')
export class ContractController {
  constructor(private readonly contractService: ContractService) {}

  @Get()
  @ApiOperation({ summary: 'Get all contracts' })
  findAll() {
    return this.contractService.findAll();
  }

  @Get('company/:companyId')
  @ApiOperation({ summary: 'Get contracts by company ID' })
  findByCompany(@Param('companyId', ParseIntPipe) companyId: number) {
    return this.contractService.findByCompany(companyId);
  }

  @Get('site/:siteId')
  @ApiOperation({ summary: 'Get contracts by site ID' })
  findBySite(@Param('siteId', ParseIntPipe) siteId: number) {
    return this.contractService.findBySite(siteId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a contract by ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.contractService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new contract' })
  create(@Body() dto: CreateContractDto) {
    return this.contractService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a contract' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateContractDto,
  ) {
    return this.contractService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a contract' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.contractService.remove(id);
  }
}

import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';

import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@ApiTags('Payments')
@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get()
  @ApiOperation({ summary: 'Get all payments' })
  findAll() {
    return this.paymentService.findAll();
  }

  @Get('company/:companyId')
  @ApiOperation({ summary: 'Get payments by company ID' })
  @ApiQuery({
    name: 'start_date',
    required: false,
    type: String,
    example: '2026-01-01',
  })
  @ApiQuery({
    name: 'end_date',
    required: false,
    type: String,
    example: '2026-01-31',
  })
  findByCompany(
    @Param('companyId', ParseIntPipe) companyId: number,
    @Query('start_date') startDate?: string,
    @Query('end_date') endDate?: string,
  ) {
    return this.paymentService.findByCompany(companyId, startDate, endDate);
  }

  @Get('company/:companyId/total')
  @ApiOperation({ summary: 'Get total payments for a company' })
  getTotal(@Param('companyId', ParseIntPipe) companyId: number) {
    return this.paymentService.getTotalByCompany(companyId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a payment by ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.paymentService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new payment' })
  create(@Body() dto: CreatePaymentDto) {
    return this.paymentService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a payment' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePaymentDto) {
    return this.paymentService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a payment' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.paymentService.remove(id);
  }

  @Get('allCompany/summary')
  @ApiOperation({ summary: 'Get payment summary for all companies' })
  getAllCompaniesSummary() {
    return this.paymentService.getAllPaymentByCompay();
  }
}

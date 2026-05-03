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
import { MethodService } from './method.service';
import { CreateMethodDto } from './dto/create-method.dto';
import { UpdateMethodDto } from './dto/update-method.dto';

@ApiTags('Payment Methods')
@Controller('methods')
export class MethodController {
  constructor(private readonly methodService: MethodService) {}

  @Get()
  @ApiOperation({ summary: 'Get all payment methods' })
  findAll() {
    return this.methodService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a payment method by ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.methodService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new payment method' })
  create(@Body() dto: CreateMethodDto) {
    return this.methodService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a payment method' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateMethodDto) {
    return this.methodService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a payment method' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.methodService.remove(id);
  }
}

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
import { CreateProductDetailDto } from './dto/create-product-detail.dto';
import { UpdateProductDetailDto } from './dto/update-product-detail.dto';
import { ProductDetailService } from './product-details.service';

@ApiTags('Product Details')
@Controller('product-details')
export class ProductDetailController {
  constructor(private readonly productDetailService: ProductDetailService) {}

  @Get()
  @ApiOperation({ summary: 'Get all selling details' })
  findAll() {
    return this.productDetailService.findAll();
  }

  // @Get('clientView')
  // @ApiOperation({ summary: 'Get all client details' })
  // clientFindAll() {
  //   return this.productDetailService.clientFindAll();
  // }

  @Get('order/:orderId')
  @ApiOperation({ summary: 'Get selling details by order ID' })
  findByOrder(@Param('orderId', ParseIntPipe) orderId: number) {
    return this.productDetailService.findByOrder(orderId);
  }

  // @Get('order/:orderId/summary')
  // @ApiOperation({ summary: 'Get profit summary for an order' })
  // getSummary(@Param('orderId', ParseIntPipe) orderId: number) {
  //   return this.productDetailService.getSummaryByOrder(orderId);
  // }

  @Get(':id')
  @ApiOperation({ summary: 'Get a selling detail by ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productDetailService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new selling detail' })
  create(@Body() dto: CreateProductDetailDto) {
    return this.productDetailService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a selling detail' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProductDetailDto,
  ) {
    return this.productDetailService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a selling detail' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productDetailService.remove(id);
  }

  @Get('company/:companyId/summary')
  @ApiOperation({ summary: 'Get profit summary for a company' })
  getCompanySummary(@Param('companyId', ParseIntPipe) companyId: number) {
    return this.productDetailService.getSummaryByCompany(companyId);
  }

  @Get('allCompany/summary')
  @ApiOperation({ summary: 'Get profit summary for all companies' })
  getAllCompaniesSummary() {
    return this.productDetailService.getAllCompaniesSummary();
  }
}

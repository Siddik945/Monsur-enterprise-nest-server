import { Module } from '@nestjs/common';
import { ProductDetailController } from './product-details.controller';
import { ProductDetailService } from './product-details.service';

@Module({
  controllers: [ProductDetailController],
  providers: [ProductDetailService],
})
export class ProductDetailsModule {}

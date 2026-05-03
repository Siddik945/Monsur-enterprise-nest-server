import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { SiteModule } from './site/site.module';
import { CompanyModule } from './company/company.module';
import { OrderModule } from './order/order.module';
import { ProductDetailsModule } from './product-details/product-details.module';
import { ProductCategoryModule } from './product-category/product-category.module';
import { MethodModule } from './method/method.module';
import { PaymentModule } from './payment/payment.module';
import { ContractModule } from './contract/contract.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    SiteModule,
    CompanyModule,
    OrderModule,
    ProductDetailsModule,
    ProductCategoryModule,
    MethodModule,
    PaymentModule,
    ContractModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

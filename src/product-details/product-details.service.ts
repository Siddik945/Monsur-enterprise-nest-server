import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDetailDto } from './dto/create-product-detail.dto';
import { UpdateProductDetailDto } from './dto/update-product-detail.dto';

@Injectable()
export class ProductDetailService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.productDetails.findMany({
      include: {
        company: true,
        site: true,
        category: true,
        contract: true,
        order: true,
      },
    });
  }

  // clientFindAll() {}

  findByOrder(orderId: number) {
    return this.prisma.productDetails.findMany({
      where: { orderId },
      include: { order: true },
    });
  }

  async findOne(id: number) {
    const detail = await this.prisma.productDetails.findUnique({
      where: { id },
      include: {
        order: { include: { site: { include: { company: true } } } },
      },
    });
    if (!detail) throw new NotFoundException(`Product Detail #${id} not found`);
    return detail;
  }

  async create(dto: CreateProductDetailDto) {
    const order = await this.prisma.order.findUnique({
      where: { id: dto.orderId },
    });

    if (!order) {
      throw new NotFoundException(`Order #${dto.orderId} not found`);
    }

    const contract = await this.prisma.contract.findUnique({
      where: { id: dto.contractId },
    });

    if (!contract) {
      throw new NotFoundException(`Contract #${dto.contractId} not found`);
    }

    const {
      date,
      orderId,
      siteId,
      companyId,
      categoriesId,
      contractId,
      challanNo,
      buyingQuantity,
      buyingPricePerCft,
      rentCost,
      labourCost,
      otherCost,
      sellingQuantity,
      status,
    } = dto;

    const totalPrice = sellingQuantity * contract.rate;
    const totalCost =
      buyingQuantity * buyingPricePerCft + rentCost + labourCost + otherCost;
    const profit = totalPrice - totalCost;

    return this.prisma.productDetails.create({
      data: {
        orderId,
        siteId,
        companyId,
        categoriesId,
        contractId,
        challanNo,
        buyingQuantity,
        buyingPricePerCft,
        rentCost,
        labourCost,
        otherCost,
        sellingQuantity,
        status,
        totalPrice,
        totalCost,
        profit,
        date: new Date(date),
      },
      include: { order: true },
    });
  }

  async update(id: number, dto: UpdateProductDetailDto) {
    const order = await this.prisma.order.findUnique({
      where: { id: dto.orderId },
    });

    if (!order) {
      throw new NotFoundException(`Order #${dto.orderId} not found`);
    }

    const contract = await this.prisma.contract.findUnique({
      where: { id: dto.contractId },
    });

    if (!contract) {
      throw new NotFoundException(`Contract #${dto.contractId} not found`);
    }

    const {
      date,
      orderId,
      siteId,
      companyId,
      categoriesId,
      contractId,
      challanNo,
      buyingQuantity,
      buyingPricePerCft,
      rentCost,
      labourCost,
      otherCost,
      sellingQuantity,
      status,
    } = dto;

    const totalPrice = sellingQuantity! * contract.rate;
    const totalCost =
      buyingQuantity! * buyingPricePerCft! +
      rentCost! +
      labourCost! +
      otherCost!;
    const profit = totalPrice - totalCost;

    return this.prisma.productDetails.update({
      where: { id },
      data: {
        orderId,
        siteId,
        companyId,
        categoriesId,
        contractId,
        challanNo,
        buyingQuantity,
        buyingPricePerCft,
        rentCost,
        labourCost,
        otherCost,
        sellingQuantity,
        status,
        totalPrice,
        totalCost,
        profit,
        date: new Date(`${dto.date}T00:00:00.000Z`),
      },
      include: { order: true },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.productDetails.delete({ where: { id } });
  }

  async getSummaryByCompany(companyId: number) {
    const details = await this.prisma.productDetails.findMany({
      where: { companyId },
      include: {
        company: true,
        order: true,
      },
    });
    return {
      companyId,
      companyName: details[0]?.company?.name || 'Unknown',
      totalPrice: details.reduce((s, d) => s + d.totalPrice, 0),
      totalCost: details.reduce((s, d) => s + d.totalCost, 0),
      totalProfit: details.reduce((s, d) => s + d.profit, 0),
      itemCount: details.length,
    };
  }

  async getAllCompaniesSummary() {
    const companies = await this.prisma.company.findMany({
      include: {
        productDetails: {
          select: {
            totalPrice: true,
            totalCost: true,
            profit: true,
          },
        },
      },
    });

    return companies.map((company) => ({
      companyId: company.id,
      companyName: company.name,
      totalPrice: company.productDetails.reduce((s, d) => s + d.totalPrice, 0),
      totalCost: company.productDetails.reduce((s, d) => s + d.totalCost, 0),
      totalProfit: company.productDetails.reduce((s, d) => s + d.profit, 0),
      itemCount: company.productDetails.length,
    }));
  }
}

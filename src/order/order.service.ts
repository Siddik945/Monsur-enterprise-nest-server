import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.order.findMany({
      where: {
        status: {
          in: ['Pending', 'Completed', 'Running'],
        },
      },
      orderBy: {
        id: 'desc',
      },
      include: {
        site: {
          include: {
            company: true,
          },
        },
        category: true,
      },
    });
  }

  async findOne(id: number) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        site: { include: { company: true } },
        category: true,
        productDetails: true,
      },
    });
    if (!order) throw new NotFoundException(`Order #${id} not found`);
    return order;
  }

  async create(dto: CreateOrderDto) {
    // Validate foreign keys before insert to give clear error messages
    const site = await this.prisma.site.findUnique({
      where: { id: dto.siteId },
    });
    if (!site)
      throw new BadRequestException(
        `Site #${dto.siteId} does not exist. Create the site first.`,
      );

    const category = await this.prisma.productCategory.findUnique({
      where: { id: dto.categoriesId },
    });
    if (!category)
      throw new BadRequestException(
        `Product Category #${dto.categoriesId} does not exist. Create the category first.`,
      );

    return this.prisma.order.create({
      data: { ...dto, date: new Date(dto.date) },
      include: { site: true, category: true },
    });
  }

  async update(id: number, dto: UpdateOrderDto) {
    await this.findOne(id);
    const data: any = { ...dto };
    if (dto.date) data.date = new Date(dto.date);
    return this.prisma.order.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.order.delete({ where: { id } });
  }
}

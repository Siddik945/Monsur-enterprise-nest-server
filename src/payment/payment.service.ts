import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Injectable()
export class PaymentService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.payment.findMany({
      include: {
        company: true,
        method: true,
      },
      orderBy: {
        date: 'desc',
      },
    });
  }

  findByCompany(companyId: number, startDate?: string, endDate?: string) {
    const where: any = {
      companyId: companyId,
    };

    if (startDate || endDate) {
      where.date = {};

      if (startDate) {
        where.date.gte = new Date(startDate);
      }

      if (endDate) {
        where.date.lte = new Date(endDate);
      }
    }

    return this.prisma.payment.findMany({
      where,
      include: {
        company: true,
        method: true,
      },
      orderBy: {
        date: 'desc',
      },
    });
  }

  async findOne(id: number) {
    const payment = await this.prisma.payment.findUnique({
      where: {
        id,
      },
      include: {
        company: true,
        method: true,
      },
    });

    if (!payment) {
      throw new NotFoundException(`Payment #${id} not found`);
    }

    return payment;
  }

  create(dto: CreatePaymentDto) {
    const { date, ...rest } = dto;

    return this.prisma.payment.create({
      data: {
        ...rest,
        date: new Date(date),
      },
      include: {
        company: true,
        method: true,
      },
    });
  }

  async update(id: number, dto: UpdatePaymentDto) {
    await this.findOne(id);

    const data: any = {
      ...dto,
    };

    if (dto.date) {
      data.date = new Date(dto.date);
    }

    return this.prisma.payment.update({
      where: {
        id,
      },
      data,
      include: {
        company: true,
        method: true,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.payment.delete({
      where: {
        id,
      },
    });
  }

  async getTotalByCompany(companyId: number) {
    const result = await this.prisma.payment.aggregate({
      where: {
        companyId: companyId,
      },
      _sum: {
        amount: true,
      },
      _count: true,
    });

    return {
      companyId,
      totalPaid: result._sum.amount ?? 0,
      paymentCount: result._count,
    };
  }

  async getAllPaymentByCompay() {
    const companies = await this.prisma.company.findMany({
      include: {
        payments: {
          select: {
            amount: true,
            date: true,
          },
        },
      },
    });

    return companies.map((company) => ({
      companyId: company.id,
      companyName: company.name,
      totalPaid: company.payments.reduce((s, p) => s + p.amount, 0),
      paymentCount: company.payments.length,
    }));
  }
}

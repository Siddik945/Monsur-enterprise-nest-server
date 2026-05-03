// import { Injectable, NotFoundException } from '@nestjs/common';
// import { PrismaService } from '../prisma/prisma.service';
// import { CreatePaymentDto } from './dto/create-payment.dto';
// import { UpdatePaymentDto } from './dto/update-payment.dto';
// import { Between } from 'typeorm';

// @Injectable()
// export class PaymentService {
//   constructor(private readonly prisma: PrismaService) {}

//   findAll() {
//     return this.prisma.payment.findMany({
//       include: { company: true, method: true },
//     });
//   }

//   findByCompany(companyId: number, startDate?: string, endDate?: string) {
//     const where: any = {
//       company_id: companyId,
//     };

//     if (startDate && endDate) {
//       where.created_at = Between(new Date(startDate), new Date(endDate));
//     }
//   }

//   async findOne(id: number) {
//     const payment = await this.prisma.payment.findUnique({
//       where: { id },
//       include: { company: true, method: true },
//     });
//     if (!payment) throw new NotFoundException(`Payment #${id} not found`);
//     return payment;
//   }

//   create(dto: CreatePaymentDto) {
//     const { date, ...rest } = dto;
//     return this.prisma.payment.create({
//       data: { ...rest, date: new Date(date) },
//       include: { company: true, method: true },
//     });
//   }

//   async update(id: number, dto: UpdatePaymentDto) {
//     await this.findOne(id);
//     const data: any = { ...dto };
//     if (dto.date) data.date = new Date(dto.date);
//     return this.prisma.payment.update({ where: { id }, data });
//   }

//   async remove(id: number) {
//     await this.findOne(id);
//     return this.prisma.payment.delete({ where: { id } });
//   }

//   async getTotalByCompany(companyId: number) {
//     const result = await this.prisma.payment.aggregate({
//       where: { companyId },
//       _sum: { amount: true },
//       _count: true,
//     });
//     return {
//       companyId,
//       totalPaid: result._sum.amount ?? 0,
//       paymentCount: result._count,
//     };
//   }
// }

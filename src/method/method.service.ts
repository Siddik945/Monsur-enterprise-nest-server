import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMethodDto } from './dto/create-method.dto';
import { UpdateMethodDto } from './dto/update-method.dto';

@Injectable()
export class MethodService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.method.findMany({ include: { payments: true } });
  }

  async findOne(id: number) {
    const method = await this.prisma.method.findUnique({
      where: { id },
      include: { payments: true },
    });
    if (!method) throw new NotFoundException(`Method #${id} not found`);
    return method;
  }

  create(dto: CreateMethodDto) {
    return this.prisma.method.create({ data: dto });
  }

  async update(id: number, dto: UpdateMethodDto) {
    await this.findOne(id);
    return this.prisma.method.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.method.delete({ where: { id } });
  }
}

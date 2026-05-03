import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto } from './dto/update-site.dto';

@Injectable()
export class SiteService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.site.findMany({
      include: { company: true, orders: true },
    });
  }

  async findOne(id: number) {
    const site = await this.prisma.site.findUnique({
      where: { id },
      include: {
        company: true,
        orders: true,
      },
    });
    if (!site) throw new NotFoundException(`Site #${id} not found`);
    return site;
  }

  create(dto: CreateSiteDto) {
    return this.prisma.site.create({ data: dto });
  }

  async update(id: number, dto: UpdateSiteDto) {
    await this.findOne(id);
    return this.prisma.site.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.site.delete({ where: { id } });
  }
}

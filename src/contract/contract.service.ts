import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';

@Injectable()
export class ContractService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.contract.findMany({
      include: {
        company: true,
        site: true,
        productCategory: true,
      },
    });
  }

  findByCompany(companyId: number) {
    return this.prisma.contract.findMany({
      where: { companyId },
      include: {
        company: true,
        site: true,
        productCategory: true,
      },
    });
  }

  findBySite(siteId: number) {
    return this.prisma.contract.findMany({
      where: { siteId },
      include: {
        company: true,
        site: true,
        productCategory: true,
      },
    });
  }

  async findOne(id: number) {
    const contract = await this.prisma.contract.findUnique({
      where: { id },
      include: {
        company: true,
        site: true,
        productCategory: true,
      },
    });
    if (!contract) throw new NotFoundException(`Contract #${id} not found`);
    return contract;
  }

  async create(dto: CreateContractDto) {
    // Validate all foreign keys before insert
    const company = await this.prisma.company.findUnique({
      where: { id: dto.companyId },
    });
    if (!company)
      throw new BadRequestException(
        `Company #${dto.companyId} does not exist.`,
      );

    const site = await this.prisma.site.findUnique({
      where: { id: dto.siteId },
    });
    if (!site)
      throw new BadRequestException(`Site #${dto.siteId} does not exist.`);

    // Ensure site belongs to the given company
    if (site.companyId !== dto.companyId)
      throw new BadRequestException(
        `Site #${dto.siteId} does not belong to Company #${dto.companyId}.`,
      );

    const category = await this.prisma.productCategory.findUnique({
      where: { id: dto.productCategoriesId },
    });
    if (!category)
      throw new BadRequestException(
        `Product Category #${dto.productCategoriesId} does not exist.`,
      );

    return this.prisma.contract.create({
      data: {
        date: new Date(dto.date),
        companyId: dto.companyId,
        siteId: dto.siteId,
        productCategoriesId: dto.productCategoriesId,
        rate: dto.rate,
      },
      include: {
        company: true,
        site: true,
        productCategory: true,
      },
    });
  }

  async update(id: number, dto: UpdateContractDto) {
    await this.findOne(id);

    // If siteId or companyId is being updated, re-validate ownership
    if (dto.siteId && dto.companyId) {
      const site = await this.prisma.site.findUnique({
        where: { id: dto.siteId },
      });
      if (!site)
        throw new BadRequestException(`Site #${dto.siteId} does not exist.`);
      if (site.companyId !== dto.companyId)
        throw new BadRequestException(
          `Site #${dto.siteId} does not belong to Company #${dto.companyId}.`,
        );
    }

    const data: any = { ...dto };
    if (dto.date) data.date = new Date(dto.date);

    return this.prisma.contract.update({
      where: { id },
      data,
      include: {
        company: true,
        site: true,
        productCategory: true,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.contract.delete({ where: { id } });
  }
}

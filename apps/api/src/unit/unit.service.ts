import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UnitService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.unit.findMany({
      orderBy: { number: 'asc' },
      include: { lessons: { orderBy: { number: 'asc' }, where: { isPublished: true } } },
    });
  }

  async findOne(id: string) {
    return this.prisma.unit.findUnique({
      where: { id },
      include: { lessons: { orderBy: { number: 'asc' }, where: { isPublished: true } } },
    });
  }
}

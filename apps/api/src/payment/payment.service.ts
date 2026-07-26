import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Injectable()
export class PaymentService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreatePaymentDto) {
    return this.prisma.payment.create({
      data: {
        ...dto,
        amount: dto.amount,
        dueDate: new Date(dto.dueDate),
        paidAt: dto.paidAt ? new Date(dto.paidAt) : undefined,
      },
      include: { student: { include: { user: true } } },
    });
  }

  async findAll() {
    return this.prisma.payment.findMany({
      include: { student: { include: { user: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.payment.findUnique({
      where: { id },
      include: { student: { include: { user: true } } },
    });
  }

  async findByStudent(studentId: string) {
    return this.prisma.payment.findMany({
      where: { studentId },
      include: { student: { include: { user: true } } },
      orderBy: { dueDate: 'desc' },
    });
  }

  async update(id: string, dto: UpdatePaymentDto) {
    return this.prisma.payment.update({
      where: { id },
      data: {
        ...dto,
        amount: dto.amount,
        dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
        paidAt: dto.paidAt ? new Date(dto.paidAt) : undefined,
      },
      include: { student: { include: { user: true } } },
    });
  }

  async remove(id: string) {
    return this.prisma.payment.delete({ where: { id } });
  }
}

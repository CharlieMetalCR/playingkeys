import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateStudentDto) {
    return this.prisma.student.create({
      data: dto,
      include: { user: true, teacher: { include: { user: true } } },
    });
  }

  async findAll() {
    return this.prisma.student.findMany({
      include: { user: true, teacher: { include: { user: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.student.findUnique({
      where: { id },
      include: { user: true, teacher: { include: { user: true } }, progress: true, payments: true },
    });
  }

  async update(id: string, dto: UpdateStudentDto) {
    return this.prisma.student.update({
      where: { id },
      data: dto,
      include: { user: true, teacher: { include: { user: true } } },
    });
  }

  async remove(id: string) {
    return this.prisma.student.delete({ where: { id } });
  }
}

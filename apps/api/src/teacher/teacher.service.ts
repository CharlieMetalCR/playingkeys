import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';

@Injectable()
export class TeacherService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateTeacherDto) {
    return this.prisma.teacher.create({
      data: dto,
      include: { user: true },
    });
  }

  async findAll() {
    return this.prisma.teacher.findMany({
      include: { user: true, students: { include: { user: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.teacher.findUnique({
      where: { id },
      include: { user: true, students: { include: { user: true } } },
    });
  }

  async update(id: string, dto: UpdateTeacherDto) {
    return this.prisma.teacher.update({
      where: { id },
      data: dto,
      include: { user: true },
    });
  }

  async remove(id: string) {
    return this.prisma.teacher.delete({ where: { id } });
  }
}

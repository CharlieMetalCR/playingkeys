import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findOwnStudents(userId: string) {
    const teacher = await this.prisma.teacher.findUnique({
      where: { userId },
      include: {
        students: {
          include: {
            user: true,
            progress: {
              select: { id: true, status: true, score: true, lessonId: true, completedAt: true },
              orderBy: { completedAt: 'desc' },
            },
          },
        },
      },
    });
    if (!teacher) throw new NotFoundException('Teacher profile not found');
    return teacher;
  }

  async updateStudentNotes(teacherUserId: string, studentId: string, notes: string) {
    const teacher = await this.prisma.teacher.findUnique({ where: { userId: teacherUserId } });
    if (!teacher) throw new NotFoundException('Teacher profile not found');
    const student = await this.prisma.student.findFirst({
      where: { id: studentId, teacherId: teacher.id },
    });
    if (!student) throw new NotFoundException('Student not assigned to this teacher');
    return this.prisma.student.update({
      where: { id: studentId },
      data: { notes },
      include: { user: true },
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

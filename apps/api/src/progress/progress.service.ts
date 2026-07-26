import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProgressDto } from './dto/create-progress.dto';

@Injectable()
export class ProgressService {
  constructor(private prisma: PrismaService) {}

  async create(createProgressDto: CreateProgressDto) {
    const { studentId, lessonId, ...rest } = createProgressDto;
    return this.prisma.progress.upsert({
      where: {
        studentId_lessonId: {
          studentId,
          lessonId,
        },
      },
      update: {
        ...rest,
      },
      create: {
        studentId,
        lessonId,
        ...rest,
      },
    });
  }

  async findAll() {
    return this.prisma.progress.findMany();
  }

  async findByStudent(studentId: string) {
    return this.prisma.progress.findMany({
      where: { studentId },
      include: {
        lesson: true,
      },
    });
  }

  async findByLesson(lessonId: string) {
    return this.prisma.progress.findMany({
      where: { lessonId },
      include: {
        student: true,
      },
    });
  }
}

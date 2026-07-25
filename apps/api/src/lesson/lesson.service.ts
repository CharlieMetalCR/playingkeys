import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';

@Injectable()
export class LessonService {
  constructor(private prisma: PrismaService) {}

  async create(createLessonDto: CreateLessonDto) {
    return this.prisma.lesson.create({
      data: createLessonDto,
    });
  }

  async findAll() {
    return this.prisma.lesson.findMany({
      include: {
        unit: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.lesson.findUnique({
      where: { id },
      include: {
        unit: true,
      },
    });
  }

  async update(id: string, updateLessonDto: UpdateLessonDto) {
    return this.prisma.lesson.update({
      where: { id },
      data: updateLessonDto,
    });
  }

  async remove(id: string) {
    return this.prisma.lesson.delete({
      where: { id },
    });
  }
}
import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';
import { Prisma } from '@prisma/client';

export class CreateLessonDto {
  @IsString()
  unitId: string;

  @IsNumber()
  number: number;

  @IsString()
  title: string;

  content: Prisma.InputJsonValue;

  @IsNumber()
  @IsOptional()
  difficulty?: number;

  @IsBoolean()
  @IsOptional()
  isPublished?: boolean;
}

import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';
import { Prisma } from '@prisma/client';

export class UpdateLessonDto {
  @IsString()
  @IsOptional()
  unitId?: string;

  @IsNumber()
  @IsOptional()
  number?: number;

  @IsString()
  @IsOptional()
  title?: string;

  content?: Prisma.InputJsonValue;

  @IsNumber()
  @IsOptional()
  difficulty?: number;

  @IsBoolean()
  @IsOptional()
  isPublished?: boolean;
}

import { IsString, IsNumber, IsOptional, IsEnum } from 'class-validator';
import { ProgressStatus } from '@prisma/client';

export class CreateProgressDto {
  @IsString()
  studentId: string;

  @IsString()
  lessonId: string;

  @IsEnum(ProgressStatus)
  @IsOptional()
  status?: ProgressStatus;

  @IsNumber()
  @IsOptional()
  score?: number;

  @IsString()
  @IsOptional()
  notes?: string;
}

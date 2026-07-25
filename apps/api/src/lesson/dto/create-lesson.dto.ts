import { IsString, IsNumber, IsBoolean, IsOptional, IsObject } from 'class-validator';

export class CreateLessonDto {
  @IsString()
  unitId: string;

  @IsNumber()
  number: number;

  @IsString()
  title: string;

  @IsObject()
  content: Record<string, unknown>;

  @IsNumber()
  @IsOptional()
  difficulty?: number;

  @IsBoolean()
  @IsOptional()
  isPublished?: boolean;
}
import { IsString, IsNumber, IsBoolean, IsOptional, IsObject } from 'class-validator';

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

  @IsObject()
  @IsOptional()
  content?: Record<string, unknown>;

  @IsNumber()
  @IsOptional()
  difficulty?: number;

  @IsBoolean()
  @IsOptional()
  isPublished?: boolean;
}
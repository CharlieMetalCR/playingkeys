import { IsString, IsOptional, IsDateString } from 'class-validator';

export class UpdateStudentDto {
  @IsString()
  @IsOptional()
  teacherId?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsDateString()
  @IsOptional()
  dateOfBirth?: string;

  @IsString()
  @IsOptional()
  emergencyContact?: string;

  @IsString()
  @IsOptional()
  notes?: string;
}

import { IsString, IsOptional } from 'class-validator';

export class UpdateTeacherDto {
  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  bio?: string;
}

import { IsString, IsOptional } from 'class-validator';

export class CreateTeacherDto {
  @IsString()
  userId: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  bio?: string;
}

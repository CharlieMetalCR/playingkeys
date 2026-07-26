import { IsString, IsNumber, IsOptional, IsDateString, IsEnum } from 'class-validator';
import { PaymentStatus } from '@prisma/client';

export class CreatePaymentDto {
  @IsString()
  studentId: string;

  @IsNumber()
  amount: number;

  @IsString()
  @IsOptional()
  currency?: string;

  @IsEnum(PaymentStatus)
  status: PaymentStatus;

  @IsDateString()
  dueDate: string;

  @IsDateString()
  @IsOptional()
  paidAt?: string;

  @IsString()
  @IsOptional()
  notes?: string;
}

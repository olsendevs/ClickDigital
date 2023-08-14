import { PartialType } from '@nestjs/mapped-types';
import { CreateFinancialDto } from './create-financial.dto';
import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class UpdateFinancialDto extends PartialType(CreateFinancialDto) {
  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsOptional()
  note: string;

  @IsNumber()
  @IsNotEmpty()
  value: number;
}

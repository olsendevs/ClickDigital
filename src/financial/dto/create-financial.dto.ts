import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateFinancialDto {
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

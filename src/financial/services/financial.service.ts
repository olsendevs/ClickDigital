import { Injectable } from '@nestjs/common';
import { CreateFinancialDto } from '../dto/create-Financial.dto';
import { UpdateFinancialDto } from '../dto/update-Financial.dto';
import { FinancialRepository } from '../repositories/Financial.repository';

@Injectable()
export class FinancialService {
  constructor(private repo: FinancialRepository) {}

  async create(createFinancialDto: CreateFinancialDto, userId: string) {
    return await this.repo.create({
      type: createFinancialDto.type,
      note: createFinancialDto.note,
      value: createFinancialDto.value,
      createAt: new Date(),
      updateAt: new Date(),
      deleted: false,
      userId,
    });
  }

  async findAll(userId: string, page: number, size: number) {
    return await this.repo.findAll(userId, page, size);
  }

  async findOne(id: string, userId: string) {
    return await this.repo.findOne(id, userId);
  }

  async update(
    id: string,
    updateFinancialDto: UpdateFinancialDto,
    userId: string,
  ) {
    return await this.repo.update(id, updateFinancialDto, userId);
  }

  async delete(id: string) {
    return await this.repo.delete(id);
  }
}

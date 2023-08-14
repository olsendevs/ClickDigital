import { Injectable } from '@nestjs/common';
import { UpdateFinancialDto } from '../dto/update-Financial.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Financial } from '../entities/Financial.entity';
import { Model } from 'mongoose';

@Injectable()
export class FinancialRepository {
  constructor(
    @InjectModel('Financial') private readonly FinancialModel: Model<Financial>,
  ) {}

  async create(doc: Financial) {
    const result = await new this.FinancialModel(doc).save();
    return result.id;
  }

  async findAll(userId: string, page: number, size: number) {
    const skip = (page - 1) * size;
    const [Financials, totalCount] = await Promise.all([
      this.FinancialModel.find({ deleted: false, userId })
        .skip(skip)
        .limit(size),
      this.FinancialModel.countDocuments({ deleted: false }).exec(),
    ]);

    return { Financials, totalCount };
  }

  async findOne(id: string, userId: string) {
    return await this.FinancialModel.findOne({
      _id: id,
      deleted: false,
      userId,
    });
  }

  async update(
    id: string,
    updateFinancialDto: UpdateFinancialDto,
    userId: string,
  ) {
    await this.FinancialModel.updateOne(
      { _id: id },
      {
        value: updateFinancialDto.value,
        note: updateFinancialDto.note,
        type: updateFinancialDto.type,
        updateAt: new Date(),
      },
    );
    return await this.findOne(id, userId);
  }

  async delete(id: string) {
    await this.FinancialModel.updateOne(
      { _id: id },
      {
        deleted: true,
        updateAt: new Date(),
      },
    );
    return true;
  }
}

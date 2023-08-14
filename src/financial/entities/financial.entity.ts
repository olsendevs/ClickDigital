import mongoose from 'mongoose';

export const FinancialSchema = new mongoose.Schema({
  type: { type: String, required: true },
  note: { type: String, required: false },
  value: { type: mongoose.Types.Decimal128, required: true },
  userId: { type: String, required: true },
  createAt: { type: Date, required: true },
  updateAt: { type: Date, required: true },
  deleted: { type: Boolean, required: true, default: false },
});

export interface Financial {
  id?: string;
  type: string;
  note?: string;
  value: number;
  userId: string;
  createAt: Date;
  updateAt: Date;
  deleted: boolean;
}

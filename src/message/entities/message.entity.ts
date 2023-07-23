import mongoose from 'mongoose';

export interface Message {
  content: string;
  customerId: string;
  userId: string;
  createAt: Date;
  updateAt: Date;
  deleted: boolean;
}

export const MessageSchema = new mongoose.Schema({
  content: { type: String, required: false },
  customerId: { type: String, required: false },
  userId: { type: String, required: true },
  createAt: { type: Date, required: true },
  updateAt: { type: Date, required: true },
  deleted: { type: Boolean, required: true, default: false },
});

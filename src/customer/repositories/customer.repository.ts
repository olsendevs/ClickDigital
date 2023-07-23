import { Injectable } from '@nestjs/common';
import { UpdateCustomerDto } from '../dto/update-Customer.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from '../entities/Customer.entity';
import { Model } from 'mongoose';

@Injectable()
export class CustomerRepository {
  constructor(
    @InjectModel('Customer') private readonly CustomerModel: Model<Customer>,
  ) {}

  async create(doc: Customer) {
    const result = await new this.CustomerModel(doc).save();
    return result.id;
  }

  async findAll(userId: string) {
    return await this.CustomerModel.find({ deleted: false, userId });
  }

  async findOne(id: string, userId: string) {
    return await this.CustomerModel.findOne({
      _id: id,
      deleted: false,
      userId,
    });
  }

  async update(
    id: string,
    updateCustomerDto: UpdateCustomerDto,
    userId: string,
  ) {
    await this.CustomerModel.updateOne(
      { _id: id },
      {
        name: updateCustomerDto.name,
        whatsapp: updateCustomerDto.whatsapp,
        login: updateCustomerDto.login,
        password: updateCustomerDto.password,
        serviceId: updateCustomerDto.serviceId,
        planId: updateCustomerDto.planId,
        invoice: updateCustomerDto.invoice,
        validateDate: updateCustomerDto.validateDate,
        sendNotificationOn: updateCustomerDto.sendNotificationOn,
        comment: updateCustomerDto.comment,
        updateAt: new Date(),
      },
    );
    return await this.findOne(id, userId);
  }

  async delete(id: string) {
    await this.CustomerModel.updateOne(
      { _id: id },
      {
        deleted: true,
        updateAt: new Date(),
      },
    );
    return true;
  }
}

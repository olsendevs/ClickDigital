import { Injectable } from '@nestjs/common';
import { UpdateCustomerDto } from '../dto/update-customer.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from '../entities/customer.entity';
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

  async findAll(
    userId: string,
    page: number,
    size: number,
    plan: string,
    service: string,
    status: string,
    billing: string
  ) {
    let query = { deleted: false, userId };

    if (plan !== 'all') Object.assign(query, { planId: plan });
    if (service !== 'all') Object.assign(query, { serviceId: service });
    if (status === 'ended') Object.assign(query, { validateDate: { $lt: new Date() } });
    if (status === 'working') Object.assign(query, { validateDate: { $gte: new Date() } });
    if (billing !== 'all') Object.assign(query, { invoice: billing });

    const skip = (page - 1) * size;
    const [customers, totalCount] = await Promise.all([
      this.CustomerModel.find(query)
        .skip(skip)
        .limit(size)
        .populate('planId', ['name', 'value'])
        .populate('serviceId', 'name'),
      this.CustomerModel.countDocuments(query).exec(),
    ]);
    return { customers, totalCount };
  }
  async getHomeData(userId: string) {
    const currentDate = new Date();

    const fiveDaysBeforeDate = new Date();
    fiveDaysBeforeDate.setDate(fiveDaysBeforeDate.getDate() - 5);

    const fiveDaysAfterDate = new Date();
    fiveDaysAfterDate.setDate(fiveDaysAfterDate.getDate() + 5);

    const [
      totalCustomers,
      totalActive,
      totalDisabled,
      customers,
      allCustomers,
    ] = await Promise.all([
      this.CustomerModel.countDocuments({
        deleted: false,
        userId,
      }).exec(),
      this.CustomerModel.countDocuments({
        deleted: false,
        validateDate: { $gte: currentDate },
        userId,
      }).exec(),
      this.CustomerModel.countDocuments({
        deleted: false,
        validateDate: { $lt: currentDate },
        userId,
      }).exec(),
      this.CustomerModel.find({
        deleted: false,
        userId,
        validateDate: { $gte: fiveDaysBeforeDate, $lt: fiveDaysAfterDate },
      }),
      this.CustomerModel.find({
        deleted: false,
        userId,
      })
        .populate('planId', ['name', 'value'])
        .populate('serviceId', ['name', 'cost']),
    ]);
    console.log(allCustomers);
    return {
      totalCustomers,
      totalActive,
      totalDisabled,
      customers,
      allCustomers,
    };
  }
  async findActive() {
    const endFilterDate = new Date();
    const afterDayDate = new Date();
    return await this.CustomerModel.find({
      deleted: false,
      validateDate: {
        $gte: afterDayDate.setDate(afterDayDate.getDate() - 2),
        $lt: endFilterDate.setDate(endFilterDate.getDate() + 6),
      },
    });
  }

  async findOne(id: string, userId: string) {
    return await this.CustomerModel.findOne({
      _id: id,
      deleted: false,
      userId,
    })
      .populate('planId', ['name', 'value'])
      .populate('serviceId', 'name');
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
        device: updateCustomerDto.device,
        mac: updateCustomerDto.mac,
        key: updateCustomerDto.key,
        apps: updateCustomerDto.apps,
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

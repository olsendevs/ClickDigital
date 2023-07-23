// openwa.module.ts

import { Module } from '@nestjs/common';
import { CronService } from './cron.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerRepository } from 'src/customer/repositories/Customer.repository';
import { CustomerSchema } from 'src/customer/entities/Customer.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Customer',
        schema: CustomerSchema,
      },
    ]),
  ],
  controllers: [],
  providers: [CronService, CustomerRepository],
})
export class CronModule {}

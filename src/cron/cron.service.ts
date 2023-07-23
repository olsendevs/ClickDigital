// cron.service.ts

import { Injectable, OnModuleInit } from '@nestjs/common';
import * as cron from 'node-cron';
import { CustomerRepository } from 'src/customer/repositories/Customer.repository';

@Injectable()
export class CronService implements OnModuleInit {
  constructor(private customerRepository: CustomerRepository) {}
  onModuleInit() {
    cron.schedule('* * * * *', async () => {
      const users = await this.customerRepository.findActive();
      console.log(users[0].sendNotificationOn);
    });
  }
}

// cron.service.ts

import { Injectable, OnModuleInit } from '@nestjs/common';
import { ChatId } from '@open-wa/wa-automate';
import * as cron from 'node-cron';
import { CustomerRepository } from 'src/customer/repositories/Customer.repository';
import { MessageConfigsRepository } from 'src/message-configs/repositories/message-configs.repository';
import { OpenWAService } from 'src/open-wa/open-wa.service';

@Injectable()
export class CronService implements OnModuleInit {
  constructor(
    private customerRepository: CustomerRepository,
    private messageConfigsRepository: MessageConfigsRepository,
    private openWAService: OpenWAService,
  ) {}
  onModuleInit() {
    cron.schedule('* * * * *', async () => {
      const customers = await this.customerRepository.findActive();
      customers.forEach(async (customer) => {
        const messageConfigs = await this.messageConfigsRepository.findByUserId(
          customer.userId,
        );
        const chatId = (customer.whatsapp + '@c.us') as ChatId;
        await this.openWAService.startSession(customer.userId);

        if (messageConfigs.EndDay != '') {
          await this.openWAService.sendMessage(chatId, messageConfigs.EndDay);
          cron.schedule('* * * * *', async () => {});
        }
      });
    });
  }
}

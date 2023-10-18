// cron.service.ts

import { Injectable, OnModuleInit } from '@nestjs/common';
import { ChatId } from '@open-wa/wa-automate';
import * as cron from 'node-cron';
import * as schedule from 'node-schedule';
import { CustomerRepository } from 'src/customer/repositories/customer.repository';
import { EvolutionApiService } from 'src/evolution-api/evolution-service.service';
import { MessageConfigsRepository } from 'src/message-configs/repositories/message-configs.repository';

@Injectable()
export class CronService implements OnModuleInit {
  constructor(
    private customerRepository: CustomerRepository,
    private messageConfigsRepository: MessageConfigsRepository,
    private evolutionService: EvolutionApiService,
  ) {}
  onModuleInit() {
    cron.schedule('* * * * *', async () => {
      try {
        const customers = await this.customerRepository.findActive();

        console.log(customers);
        customers.forEach(async (customer) => {
          const messageConfigs =
            await this.messageConfigsRepository.findByUserId(customer.userId);
          const chatId = customer.whatsapp;

          let validateDate = new Date(customer.validateDate);
          let tomorow = new Date();
          tomorow = new Date(tomorow.setDate(tomorow.getDate() + 1));
          tomorow = new Date(tomorow.setHours(12));
          tomorow = new Date(tomorow.setMinutes(0));

          const fiveDaysBefore = new Date(
            validateDate.setDate(validateDate.getDate() - 4),
          );

          if (fiveDaysBefore.getDate() == tomorow.getDate()) {
            if (
              messageConfigs.fiveDaysBefore != '' &&
              customer.sendNotificationOn.fiveDaysBefore.sended == false
            ) {
              schedule.scheduleJob(tomorow, async () => {
                await this.evolutionService.sendMessage(
                  customer.userId,
                  chatId,
                  messageConfigs.fiveDaysBefore,
                );
              });
              customer.sendNotificationOn.fiveDaysBefore.sended = true;
              this.customerRepository.update(
                customer._id.toString(),
                customer,
                customer.userId,
              );
            }
            return;
          }

          validateDate = new Date(customer.validateDate);
          const threeDaysBefore = new Date(
            validateDate.setDate(validateDate.getDate() - 2),
          );
          if (threeDaysBefore.getDate() == tomorow.getDate()) {
            if (
              messageConfigs.threeDaysBefore != '' &&
              customer.sendNotificationOn.threeDaysBefore.sended == false
            ) {
              schedule.scheduleJob(tomorow, async () => {
                await this.evolutionService.sendMessage(
                  customer.userId,
                  chatId,
                  messageConfigs.threeDaysBefore,
                );
              });
              customer.sendNotificationOn.threeDaysBefore.sended = true;
              this.customerRepository.update(
                customer._id.toString(),
                customer,
                customer.userId,
              );
            }
            return;
          }

          validateDate = new Date(customer.validateDate);
          const oneDayBefore = new Date(
            validateDate.setDate(validateDate.getDate()),
          );

          if (oneDayBefore.getDate() == tomorow.getDate()) {
            if (
              messageConfigs.oneDayBefore != '' &&
              customer.sendNotificationOn.oneDayBefore.sended == false
            ) {
              schedule.scheduleJob(tomorow, async () => {
                await this.evolutionService.sendMessage(
                  customer.userId,
                  chatId,
                  messageConfigs.oneDayBefore,
                );
              });
              customer.sendNotificationOn.oneDayBefore.sended = true;
              this.customerRepository.update(
                customer._id.toString(),
                customer,
                customer.userId,
              );
            }
            return;
          }

          validateDate = new Date(customer.validateDate);
          const EndDay = new Date(
            validateDate.setDate(validateDate.getDate() + 1),
          );
          if (EndDay.getDate() == tomorow.getDate()) {
            if (
              messageConfigs.EndDay != '' &&
              customer.sendNotificationOn.EndDay.sended == false
            ) {
              schedule.scheduleJob(tomorow, async () => {
                await this.evolutionService.sendMessage(
                  customer.userId,
                  chatId,
                  messageConfigs.EndDay,
                );
              });
              customer.sendNotificationOn.EndDay.sended = true;
              this.customerRepository.update(
                customer._id.toString(),
                customer,
                customer.userId,
              );
            }
            return;
          }

          validateDate = new Date(customer.validateDate);
          const oneDayAfter = new Date(
            validateDate.setDate(validateDate.getDate() + 2),
          );

          if (oneDayAfter.getDate() == tomorow.getDate()) {
            if (
              messageConfigs.oneDayAfter != '' &&
              customer.sendNotificationOn.oneDayAfter.sended == false
            ) {
              console.log(customer.userId, chatId, messageConfigs.oneDayAfter);
              schedule.scheduleJob(tomorow, async () => {});
              await this.evolutionService.sendMessage(
                customer.userId,
                chatId,
                messageConfigs.oneDayAfter,
              );

              customer.sendNotificationOn.oneDayAfter.sended = true;
              this.customerRepository.update(
                customer._id.toString(),
                customer,
                customer.userId,
              );
            }
            return;
          }
        });
      } catch (e) {}
    });
  }
}

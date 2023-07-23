// openwa.session.ts

import { Injectable } from '@nestjs/common';
import {
  create,
  Client,
  ev,
  NotificationLanguage,
  ChatId,
} from '@open-wa/wa-automate';

@Injectable()
export class OpenWAService {
  private client: Client;

  async startSession(sessionId: string): Promise<void> {
    if (this.client != undefined) {
      const sessionAlreadyUp = this.client.getSessionId();
      if (sessionAlreadyUp) {
        ev.emit((await this.client.getHostNumber()).toString(), 'SUCCESS');
        return;
      }
    }
    this.client = await create({
      sessionId: sessionId,
      multiDevice: true,
      authTimeout: 60,
      blockCrashLogs: true,
      disableSpins: true,
      headless: true,
      hostNotificationLang: NotificationLanguage.PTBR,
      logConsole: false,
      popup: true,
      qrTimeout: 0,
    });
    console.log('Sessão Open-WA iniciada!');
    this.setupMessageListener();
  }

  private setupMessageListener() {
    this.client.onMessage(async (message) => {
      if (message.body === 'Hi') {
        console.log(message.from);
        await this.client.sendText(message.from, '👋 Hello!');
      }
    });
  }

  async sendMessage(sessionId: ChatId, message: string) {
    await this.client.sendText(sessionId, message);
  }
}

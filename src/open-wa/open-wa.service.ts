// openwa.session.ts

import { Injectable } from '@nestjs/common';
import { create, Client, ev, NotificationLanguage } from '@open-wa/wa-automate';

@Injectable()
export class OpenWASession {
  private client: Client;

  async startSession(sessionId: string): Promise<void> {
    if (this.client != undefined) {
      const sessionAlreadyUp = this.client.getSessionId();
      if (sessionAlreadyUp) {
        ev.emit(sessionId, 'SUCCESS');
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
}

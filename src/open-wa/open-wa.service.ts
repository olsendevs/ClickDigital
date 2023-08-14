// openwa.session.ts

import { Injectable, Search } from '@nestjs/common';
import {
  create,
  Client,
  ev,
  NotificationLanguage,
  ChatId,
} from '@open-wa/wa-automate';
import { session } from 'passport';

@Injectable()
export class OpenWAService {
  private client: Client[] | any = [];
  private _seasson: string[] = [];
  async startSession(sessionId: string): Promise<void> {
    try {
      console.log('client ', this.client);
      if (this.client != undefined) {
        const sessionAlreadyUp = this.client.find((x) => x == sessionId);
        if (sessionAlreadyUp) {
          if (sessionAlreadyUp.getSessionId() == sessionId) {
            ev.emit((await this.client.getHostNumber()).toString(), 'SUCCESS');
            return;
          }
        }
      }

      if (this._seasson != undefined && this._seasson.includes(sessionId)) {
        ev.on('qr.**', async (image) => {
          return;
        });
      } else {
        this._seasson.push(sessionId);

        this.client.push(
          await create({
            sessionId: sessionId,
            multiDevice: true,
            authTimeout: 60,
            blockCrashLogs: true,
            disableSpins: true,
            headless: true,
            hostNotificationLang: NotificationLanguage.PTBR,
            logConsole: false,
            popup: true,
            qrTimeout: 60,
          }).catch((e) => {}),
        );

        console.log('Sessão Open-WA iniciada!');
      }
    } catch (e) {
      console.log(e);
      const index = this._seasson.indexOf(sessionId);
      this._seasson.splice(index, 1);
    }
  }
  async checkSession(sessionId: string): Promise<boolean> {
    try {
      if (this.client != undefined) {
        const sessionAlreadyUp = this.client.find(
          (x) => x != undefined && x._createConfig.sessionId == sessionId,
        );
        if (sessionAlreadyUp) {
          if (sessionAlreadyUp.getSessionId() == sessionId) {
            return true;
          }
        }
      }
      return false;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
  async closeSession(sessionId: string): Promise<void> {
    try {
      if (this.client != undefined) {
        const sessionAlreadyUp = this.client.find((x) => x == sessionId);
        if (sessionAlreadyUp) {
          if (sessionAlreadyUp.getSessionId() == sessionId) {
            console.log('kill - ' + sessionId);
            await sessionAlreadyUp.kill();
          }
        }
      }
    } catch (e) {
      console.log('erro aqui: ', e);
    }
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

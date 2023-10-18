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
import {
  IEvolutionInstanceList,
  IEvolutionMessageSend,
} from 'src/types/evolution-api.type';

@Injectable()
export class EvolutionApiService {
  private async api<T, U>(
    endpoint: string,
    body?: T,
    method: string = 'GET',
  ): Promise<U> {
    const response = await fetch(`http://89.117.56.45:8080${endpoint}`, {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        apikey: process.env.EVOLUTIONAPI_KEY,
      },
      body: body
        ? JSON.stringify(
            Object.assign(body, { apikey: process.env.EVOLUTIONAPI_KEY }),
          )
        : undefined,
    });

    return (await response.json()) as U;
  }

  async sendMessage(sessionId: string, chatId: string, message: string) {
    try {
      const instances = await this.api<null, IEvolutionInstanceList[]>(
        '/instance/fetchInstances',
      );
      const exists = instances.find(
        (i) => i.instance.instanceName === sessionId,
      );

      if (exists && exists.instance.status === 'open') {
        await this.api<unknown, IEvolutionMessageSend>(
          `/message/sendText/${sessionId}`,
          {
            number: chatId,
            options: {
              delay: 100,
              presence: 'composing',
            },
            textMessage: {
              text: message,
            },
          },
          'POST',
        );

        return;
      } else {
        throw new Error('Sessão não encontrada.');
      }
    } catch (e) {
      console.error(e);
      throw new Error('Erro ao obter a sessão do usuário.');
    }
  }
}

// evolution-api.controller.ts

import type {
  IEvolutionInstanceList,
  IEvolutionInstanceCreate,
  IEvolutionMessageSend,
} from 'src/types/evolution-api.type';
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { Roles, RolesGuard } from 'src/auth/jwt/role.guard';
import { SendMessageDto } from './dto/send-message.dto';

@Controller('qr-code')
export class EvolutionAPIController {
  public constructor() {}

  @UseGuards(RolesGuard)
  @Roles('default')
  @Get()
  public async getQRCode(@Res() res: Response, @Req() req) {
    if (!req.user?.id && !req.headers?.id) {
      return res.status(401).send('Não autorizado.');
    }

    try {
      const instances = await this.api<null, IEvolutionInstanceList[]>(
        '/instance/fetchInstances',
      );
      const exists = instances.some(
        (i) => i.instance.instanceName === (req.user?.id || req.headers?.id),
      );

      if (exists) {
        res.status(200).send('Usuário já está conectado.');
      } else {
        const response = await this.api<unknown, IEvolutionInstanceCreate>(
          '/instance/create',
          {
            instanceName: 'teste',
            qrcode: true,
          },
          'POST',
        );

        res.status(200).send(response.qrcode.base64);
      }
    } catch (e) {
      console.error(e);
      res.status(500).send('Erro ao obter o código QR.');
    }
  }

  @UseGuards(RolesGuard)
  @Roles('default')
  @Get('check')
  public async getSession(@Res() res: Response, @Req() req) {
    if (!req.user?.id && !req.headers?.id) {
      return res.status(401).send('Não autorizado.');
    }

    try {
      const instances = await this.api<null, IEvolutionInstanceList[]>(
        '/instance/fetchInstances',
      );
      const exists = instances.some(
        (i) => i.instance.instanceName === (req.user?.id || req.headers?.id),
      );

      return res.status(200).send(exists);
    } catch (e) {
      console.error(e);
      res.status(500).send('Erro ao obter a sessão do usuário.');
    }
  }

  @UseGuards(RolesGuard)
  @Roles('default')
  @Post('send-message')
  public async sendMessage(
    @Body() message: SendMessageDto,
    @Res() res: Response,
    @Req() req,
  ) {
    if (!req.user?.id && !req.headers?.id) {
      return res.status(401).send('Não autorizado.');
    }

    try {
      const instances = await this.api<null, IEvolutionInstanceList[]>(
        '/instance/fetchInstances',
      );
      const exists = instances.some(
        (i) => i.instance.instanceName === (req.user?.id || req.headers?.id),
      );

      if (exists) {
        await this.api<unknown, IEvolutionMessageSend>(
          `/message/sendText/${req.user?.id || req.headers?.id}`,
          {
            number: message.whatsapp,
            options: {
              delay: 100,
              presence: 'composing',
            },
            textMessage: {
              text: message.message,
            },
          },
          'POST',
        );

        res.status(200).send();
      } else {
        res.status(404).send('Sessão não encontrada.');
      }
    } catch (e) {
      console.error(e);
      res.status(500).send('Erro ao obter a sessão do usuário.');
    }
  }

  private async api<T, U>(
    endpoint: string,
    body?: T,
    method: string = 'GET',
  ): Promise<U> {
    const response = await fetch(`http://127.0.0.1:4000${endpoint}`, {
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
}

// qr-code.controller.ts

import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { OpenWAService } from './open-wa.service';
import { Response } from 'express';
import { ChatId, ev } from '@open-wa/wa-automate';
import { Roles, RolesGuard } from 'src/auth/jwt/role.guard';
import { SendMessageDto } from './dto/send-message.dto';

@Controller('qr-code')
export class OpenWAController {
  constructor(private readonly openWASession: OpenWAService) {}
  @UseGuards(RolesGuard)
  @Roles('default')
  @Get()
  async getQRCode(@Res() res: Response, @Req() req) {
    try {
      console.log('userid ', req.user.id);
      //await res.setHeader('Content-Type', 'image/png');
      ev.on(`qr.${req.user.id}`, async (image) => {
        try {
          return await res.send(image);
        } catch (e) {}
      });

      ev.onAny(async (data, namespace) => {
        if (namespace == 'SUCCESS')
          try {
            await res.setHeader('Content-Type', 'text/json');
            return await res.send('Already conected.');
          } catch (e) {}
      });

      this.openWASession.startSession(req.user.id);
    } catch (error) {
      res.status(500).send('Erro ao obter o código QR.');
    }
  }
  @UseGuards(RolesGuard)
  @Roles('default')
  @Get('check')
  async getSeasson(@Res() res: Response, @Req() req) {
    try {
      const result = await this.openWASession.checkSession(req.user.id);
      return res.status(200).send(result);
    } catch (error) {
      res.status(500).send('Erro ao obter o  sessão do usuário.');
    }
  }
  @UseGuards(RolesGuard)
  @Roles('default')
  @Post('send-message')
  async sendMessage(
    @Body() sendMessage: SendMessageDto,
    @Res() res: Response,
    @Req() req,
  ) {
    try {
      const chatId = (sendMessage.whatsapp + '@c.us') as ChatId;
      await this.openWASession.sendMessage(
        req.user.id,
        chatId,
        sendMessage.message,
      );
      return res.status(200).send();
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao obter o  sessão do usuário.');
    }
  }
}

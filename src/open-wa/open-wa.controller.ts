// qr-code.controller.ts

import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { OpenWAService } from './open-wa.service';
import { Response } from 'express';
import { ev } from '@open-wa/wa-automate';
import { Roles, RolesGuard } from 'src/auth/jwt/role.guard';

@Controller('qr-code')
export class OpenWAController {
  constructor(private readonly openWASession: OpenWAService) {}
  @UseGuards(RolesGuard)
  @Roles('default')
  @Get()
  async getQRCode(@Res() res: Response, @Req() req) {
    try {
      await res.setHeader('Content-Type', 'image/png');
      ev.on('qr.**', async (image) => {
        const imageData = image.split(',')[1]; // Remove the data URI scheme (e.g., "data:image/png;base64,")
        const imageBuffer = Buffer.from(imageData, 'base64');

        return await res.send(imageBuffer);
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
}

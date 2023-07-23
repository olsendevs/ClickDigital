// openwa.module.ts

import { Module } from '@nestjs/common';
import { OpenWASession } from './open-wa.service';
import { OpenWAController } from './open-wa.controller';

@Module({
  controllers: [OpenWAController],
  providers: [OpenWASession],
  exports: [OpenWASession],
})
export class OpenWAModule {}

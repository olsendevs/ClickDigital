// evolution-api.module.ts

import { Module } from '@nestjs/common';
import { EvolutionAPIController } from './evolution-api.controller';

@Module({
  controllers: [EvolutionAPIController],
  providers: [],
  exports: [],
})
export class EvolutionAPIModule {}

// evolution-api.module.ts

import { Module } from '@nestjs/common';
import { EvolutionAPIController } from './evolution-api.controller';
import { EvolutionApiService } from './evolution-service.service';

@Module({
  controllers: [EvolutionAPIController],
  providers: [EvolutionApiService],
  exports: [EvolutionApiService],
})
export class EvolutionAPIModule {}

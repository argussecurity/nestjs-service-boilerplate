import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';

import { HealthService } from '../services/health.service';

@Module({
  imports: [TerminusModule.forRootAsync({
    useClass: HealthService,
  })],
})
export class HealthModule {}

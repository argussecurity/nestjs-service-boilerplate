import { Module } from '@nestjs/common';
import { CarsModule } from 'rest-api/modules/cars.module';
import { MetricsModule } from 'rest-api/modules/metrics.module';
import { HealthModule } from 'rest-api/modules/health.module';

@Module({
  imports: [
    MetricsModule,
    HealthModule,
    CarsModule,
  ],
})
export class RestApiModule {}

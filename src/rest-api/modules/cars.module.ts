import { Module } from '@nestjs/common';
import { CarsController } from 'rest-api/controllers/cars.controller';
import { CarsService } from 'rest-api/services/cars.service';
import { PromModule, MetricType } from '@digikare/nestjs-prom';
import { PrometheusConsts } from 'rest-api/consts/prometheus.consts';
import { LoggerModule } from 'common/modules/logger.module';
import { DatabaseHandlerModule } from 'database-handler/database-handler.module';

@Module({
    imports: [
        PromModule.forMetrics([
        {
            type: MetricType.Counter,
            configuration: {
                name: PrometheusConsts.CAR_FAILURES_COUNTER,
                help: 'the amount of failures',
            },
        }]),
        LoggerModule,
        DatabaseHandlerModule,
    ],
    controllers: [CarsController],
    providers: [CarsService],
})
export class CarsModule {}

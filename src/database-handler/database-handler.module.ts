import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarsRepository } from 'database-handler/repositories/interfaces/cars.repository';
import { CarsSqliteRepository } from 'database-handler/repositories/cars-sqlite.repository';
import { CarEntity } from 'database-handler/models/car.entity';
import { getConnectionOptions } from 'typeorm';
import { LoggerService } from 'common/services/logger.service';

async function typeOrmConnectionFactory() {
  const originOptions = await getConnectionOptions();
  const logger = new LoggerService();

  logger.init('database');

  return {
    ...originOptions,
    logger,
  };
}

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: typeOrmConnectionFactory,
    }),
    TypeOrmModule.forFeature([CarEntity]),
  ],
  providers: [{
      provide: CarsRepository,
      useClass: CarsSqliteRepository,
  }],
  exports: [CarsRepository],
})
export class DatabaseHandlerModule {}

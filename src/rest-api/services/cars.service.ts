import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CarDto } from 'rest-api/models/car.dto';
import { CreateCarDto } from 'rest-api/models/create-car.dto';
import { CarFailureException } from 'rest-api/filters/exceptions/car-failure.exception';
import { PrometheusConsts } from 'rest-api/consts/prometheus.consts';
import { CarEntity } from 'database-handler/models/car.entity';
import { LoggerService } from 'common/services/logger.service';
import { CarsRepository } from 'database-handler/repositories/interfaces/cars.repository';
import { CounterMetric, InjectCounterMetric } from '@digikare/nestjs-prom';

@Injectable()
export class CarsService {
    constructor(
        private readonly carsRepository: CarsRepository,
        private readonly logger: LoggerService,

        @InjectCounterMetric(PrometheusConsts.CAR_FAILURES_COUNTER)
        private readonly carFailuresCounter: CounterMetric,
    ) {
        this.logger.init(Object.getPrototypeOf(this).constructor.name);
    }

    async find(): Promise<CarDto[]> {
        this.logger.log('Getting all available cars');

        return this.carsRepository.getAll();
    }

    async findOne(id: string): Promise<CarDto> {
        const car = await this.carsRepository.findById(id);

        if (!car) {
            throw new NotFoundException();
        }

        return car;
    }

    async create(createCarDto: CreateCarDto): Promise<CarEntity> {
        const carEntity = CarEntity.create(createCarDto);

        try {
            await this.carsRepository.create(carEntity);
        } catch {
            throw new BadRequestException();
        }

        return carEntity;
    }

    async triggerError(id: string): Promise<void> {
        this.carFailuresCounter.inc();
        throw new CarFailureException(`Car failure recorded, id: ${id}`);
    }
}

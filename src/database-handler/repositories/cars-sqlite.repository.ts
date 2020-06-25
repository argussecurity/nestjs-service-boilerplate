import { Repository } from 'typeorm';
import { CarEntity } from 'database-handler/models/car.entity';
import { CarsRepository } from './interfaces/cars.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { PromInstanceCounter } from '@digikare/nestjs-prom';

@Injectable()
@PromInstanceCounter
export class CarsSqliteRepository implements CarsRepository {
    constructor(
        @InjectRepository(CarEntity)
        private readonly carsRepository: Repository<CarEntity>,
    ) {}

    async getAll(): Promise<CarEntity[]> {
        return await this.carsRepository.find();
    }

    async findById(id: string): Promise<CarEntity> {
        return (await this.carsRepository.findByIds([id]))[0];
    }

    async create(car: CarEntity) {
        await this.carsRepository.insert(car);
    }
}

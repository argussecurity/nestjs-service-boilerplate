import { CarEntity } from 'database-handler/models/car.entity';

export abstract class CarsRepository {
    abstract getAll(): Promise<CarEntity[]>;
    abstract findById(id: string): Promise<CarEntity>;
    abstract create(car: CarEntity): void;
}

import { Mock } from 'ts-mockery';
import { CarsController } from 'rest-api/controllers/cars.controller';
import { CarsService } from 'rest-api/services/cars.service';
import { CarEntity } from 'database-handler/models/car.entity';

Mock.configure('jest');

describe('CarsController', () => {
  describe('findAll', () => {
    it('should return an array of cars', async () => {
        const expectedCars: CarEntity[] = [];
        const carsServiceMock = Mock.of<CarsService>({
            find: async () => expectedCars,
        });

        const carsController = new CarsController(carsServiceMock);

        expect(await carsController.findAll()).toEqual(expectedCars);
        expect(carsServiceMock.find).toHaveBeenCalledTimes(1);
    });
  });
});

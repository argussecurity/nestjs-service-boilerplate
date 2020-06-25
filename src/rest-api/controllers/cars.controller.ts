import { Controller, Get, Param, Post, Body, UseFilters } from '@nestjs/common';
import { CarDto } from 'rest-api/models/car.dto';
import { CarsService } from 'rest-api/services/cars.service';
import { CreateCarDto } from 'rest-api/models/create-car.dto';
import { CarFailureFilter } from 'rest-api/filters/car-failure.filter';
import { ApiTags, ApiOperation, ApiOkResponse, ApiParam, ApiNotFoundResponse } from '@nestjs/swagger';

@Controller('cars')
@UseFilters(CarFailureFilter)
@ApiTags('cars')
export class CarsController {
    constructor(private readonly carsService: CarsService) {}

    @Get()
    @ApiOperation({
        description: 'gets all available cars',
    })
    @ApiOkResponse({
        description: 'successfully found and fetched the requested cars',
        type: [CarDto],
    })
    async findAll(): Promise<CarDto[]> {
        return this.carsService.find();
    }

    @Get(':id')
    @ApiOperation({
        description: 'gets a specific car by the given id',
    })
    @ApiParam({
        name: 'id',
        required: true,
        description: 'the id of the car',
    })
    @ApiOkResponse({
        description: 'successfully found and fetched the requested car',
        type: CarDto,
    })
    @ApiNotFoundResponse({
        description: 'the requested car was not found',
    })
    async findOne(@Param('id') id: string): Promise<CarDto> {
        return this.carsService.findOne(id);
    }

    @Post()
    async createCar(@Body() createCarDto: CreateCarDto): Promise<CarDto> {
        return this.carsService.create(createCarDto);
    }

    @Post(':id/recordError')
    async triggerError(@Param('id') id: string): Promise<void> {
        await this.carsService.triggerError(id);
    }
}

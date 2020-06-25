import { v4 as uuidv4 } from 'uuid';
import { Entity, Column, PrimaryColumn } from 'typeorm';
import { CreateCarDto } from 'rest-api/models/create-car.dto';
import { PromInstanceCounter } from '@digikare/nestjs-prom';

@Entity({name: "cars"})
@PromInstanceCounter
export class CarEntity {
    @PrimaryColumn('varchar', { width: 50 }) id: string;
    @Column('text') name: string;
    @Column('text') description: string;
    @Column('int')  version: number;
    @Column()       enabled: boolean;

    static create(createCarDto: CreateCarDto): CarEntity {
        const res = new CarEntity();

        res.id = uuidv4();
        res.name = createCarDto.name;
        res.description = createCarDto.description;
        res.enabled = createCarDto.enabled;
        res.version = 1;

        return res;
    }
}

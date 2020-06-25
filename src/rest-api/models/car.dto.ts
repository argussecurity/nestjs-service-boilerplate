import { ApiProperty } from '@nestjs/swagger';

export class CarDto {
    @ApiProperty({
        example: '481-133-182',
        description: 'Car ID',
    })
    id: string;

    @ApiProperty({
        example: 'some car name',
        description: 'The name of the car',
    })
    name: string;

    @ApiProperty({
        example: 'Used by someone',
        description: 'Description of the Car',
    })
    description: string;

    @ApiProperty({
        example: true,
        description: 'Car is enabled flag',
    })
    enabled?: boolean = true;
}

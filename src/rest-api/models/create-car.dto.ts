import { ApiProperty } from '@nestjs/swagger';

export class CreateCarDto {
    @ApiProperty({
        description: 'Some name',
    })
    name: string;

    @ApiProperty({
        description: 'Some description',
    })
    description: string;

    @ApiProperty({
        description: 'Activity status',
    })
    enabled: boolean;
}

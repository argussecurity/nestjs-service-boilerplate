import { Injectable } from '@nestjs/common';
import { TerminusOptionsFactory, TerminusModuleOptions, TerminusEndpoint, TypeOrmHealthIndicator } from '@nestjs/terminus';

@Injectable()
export class HealthService implements TerminusOptionsFactory {
    constructor(
        private readonly database: TypeOrmHealthIndicator,
    ) {}

    createTerminusOptions(): TerminusModuleOptions {
        const healthEndpoint: TerminusEndpoint = {
            url: '/health',
            healthIndicators: [
                async () => this.database.pingCheck('database', { timeout: 300 }),
            ],
        };

        return {
            endpoints: [healthEndpoint],
        };
    }
}

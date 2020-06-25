import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { PromModule } from '@digikare/nestjs-prom';
import { InboundMiddleware } from '@digikare/nestjs-prom/dist/middleware/inbound.middleware';

@Module({
    imports: [
        PromModule.forRoot({
          useHttpCounterMiddleware: true,
          defaultLabels: {
            app: 'cars',
          },
        }),
    ],
})
export class MetricsModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
        .apply(InboundMiddleware)
        .exclude({
            path: '/metrics',
            method: RequestMethod.GET,
        })
        .forRoutes('*');
    }
}

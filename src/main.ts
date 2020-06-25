import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as JsYaml from 'js-yaml';
import * as FileSystem from 'fs';
import { RestApiModule } from 'rest-api/rest-api.module';
import { LoggerService } from 'common/services/logger.service';

async function bootstrap() {
  const swaggerOptions = new DocumentBuilder()
    .setTitle('Cars NestJS Example')
    .setVersion('1.0')
    .addTag('cars')
    .build();

  const logger = new LoggerService();
  logger.init('nest-js');

  const app = await NestFactory.create(RestApiModule, { logger });
  app.useGlobalPipes(new ValidationPipe());

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerOptions);
  FileSystem.writeFileSync('openapi.yaml', JsYaml.safeDump(swaggerDocument));

  await app.listen(Number(process.env.PORT) || 8080);
}

bootstrap().catch(err => {
  // tslint:disable-next-line:no-console
  console.error(err);
  process.exit(1);
});

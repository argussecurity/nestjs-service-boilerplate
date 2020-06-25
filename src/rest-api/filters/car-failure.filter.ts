import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { CarFailureException } from './exceptions/car-failure.exception';

@Catch(CarFailureException)
export class CarFailureFilter implements ExceptionFilter {
  catch(exception: CarFailureException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .send(exception.message);
  }
}

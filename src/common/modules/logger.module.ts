import { Module } from '@nestjs/common';
import { LoggerService } from 'common/services/logger.service';

@Module({
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}

import { Injectable, Scope, LoggerService as NestLoggerService } from '@nestjs/common';
import { Logger } from 'typeorm';
import * as winston from 'winston';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService implements NestLoggerService, Logger {

    private logger: winston.Logger = winston.createLogger({
      level: 'info',
      format: winston.format.json(),
      transports: new winston.transports.Console(),
    });

    private context: any;

    private writeLog(message: string, level: string, metadata?: object) {
        const fullMetadata: object = {
            context: this.context,
            metadata,
        };
        this.logger.log(level, message, fullMetadata);
    }

    init(context: string) {
        this.context = context;
    }

    log(message: string) {
        this.writeLog(message, 'info');
    }

    warn(message: string) {
        this.writeLog(message, 'warn');
    }

    error(message: string) {
        this.writeLog(message, 'error');
    }

    debug(message: string) {
        this.writeLog(message, 'debug');
    }

    verbose(message: string) {
        this.writeLog(message, 'verbose');
    }

    logQuery(query: string, parameters?: any[]) {
        this.writeLog('executing query', 'info', { query, parameters });
    }

    logQueryError(error: string, query: string, parameters?: any[]) {
        this.writeLog(error, 'error', { query, parameters });
    }

    logQuerySlow(time: number, query: string, parameters?: any[]) {
        this.writeLog('query execution is slow', 'warn', { time, query, parameters });
    }

    logSchemaBuild(message: string) {
        this.writeLog(message, 'info');
    }

    logMigration(message: string) {
        this.writeLog(message, 'info');
    }
}

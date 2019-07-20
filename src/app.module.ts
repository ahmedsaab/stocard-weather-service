import { Module } from '@nestjs/common';
import { CitiesModule } from './cities/cities.module';
import { ConfigModule } from './config/config.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

@Module({
  imports: [ConfigModule, CitiesModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    }, {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
  }],
})
export class AppModule {}

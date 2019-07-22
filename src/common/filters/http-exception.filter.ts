import { ExceptionFilter, Catch, ArgumentsHost, HttpException, BadRequestException } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    if (exception instanceof BadRequestException) {
      exception = new BadRequestException({
        code: 'BadRequestError',
        message: 'lat/lng required',
      });
    }
    response
      .status(status)
      .json(exception.getResponse());
  }
}

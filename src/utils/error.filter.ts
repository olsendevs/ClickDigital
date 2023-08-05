// not-found.filter.ts

import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';

@Catch(Error)
export class ErrorFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    if (exception.name === 'Error' && exception.message.includes('ENOENT')) {
      response.status(404).json({
        statusCode: 404,
        message: 'Resource not found',
        error: 'Not Found',
      });
    } else {
      // Handle other types of errors
      response.status(500).json({
        statusCode: 500,
        message: 'Internal server error',
        error: 'Internal Server Error',
      });
    }
  }
}

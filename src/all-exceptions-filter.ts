import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { LoggerService } from './logger/logger.service'
import { HttpAdapterHost } from '@nestjs/core'
import { PrismaClientValidationError } from '@prisma/client/runtime/library'

type MyResponseObj = {
  statusCode: number
  timestamp: string
  path: string
  response: string | object
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new LoggerService(AllExceptionsFilter.name)

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost

    const ctx = host.switchToHttp()

    const responseBody: MyResponseObj = {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      response: '',
    }

    if (exception instanceof HttpException) {
      responseBody.statusCode = exception.getStatus()
      responseBody.response = exception.getResponse()
    } else if (exception instanceof PrismaClientValidationError) {
      responseBody.statusCode = 422
      responseBody.response = exception.message
    } else {
      responseBody.response = 'Internal Server Error'
    }

    this.logger.error(responseBody.response, AllExceptionsFilter.name)
    httpAdapter.reply(ctx.getResponse(), responseBody, responseBody.statusCode)
  }
}

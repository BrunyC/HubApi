import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import momentTimezone from 'moment-timezone';
import { LogginInterceptor } from './interceptors/loggin.interceptor';
import { TimeoutInterceptor } from './interceptors/timeout.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

require('dotenv').config();


async function bootstrap() {
  const port = process.env.SERVER_PORT || 3000;
  var options = {}

  const app = await NestFactory.create(AppModule, options);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
  });
  
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new LogginInterceptor(), new TimeoutInterceptor());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors();
  app.setGlobalPrefix('api');
  
  const config = new DocumentBuilder()
    .setTitle('HUB API')
    .setDescription('Documentação HUB API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  Date.prototype.toJSON = function (): any {
    return momentTimezone(this)
      .tz('America/Sao_Paulo')
      .format('YYYY-MM-DD HH:mm:ss.SSS');
  };

  await app.startAllMicroservices();

  await app.listen(port);
}
bootstrap();
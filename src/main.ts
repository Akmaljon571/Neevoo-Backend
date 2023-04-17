import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { swaggerConfig } from './config/swagger';
import { ErrorHandle } from './filter/custom.exetepsion.filter';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.use(
    cors({
      origin: '*',
      credentials: true,
    }),
  );
  app.enableCors({ credentials: true });
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ErrorHandle());
  app.setGlobalPrefix('v1');

  const config = app.get(ConfigService);
  const port = config.getOrThrow('app.port');
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);
  console.log(port);
  await app.listen(port);
}
bootstrap();

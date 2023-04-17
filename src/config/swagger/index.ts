import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Neevoo project')
  .setVersion('1.0')
  .build();

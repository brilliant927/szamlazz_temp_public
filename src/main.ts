import * as dotenv from 'dotenv';
import { NestFactory } from '@nestjs/core';
import * as expressBasicAuth from 'express-basic-auth';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Order Management API')
    .setDescription(
      'This API service is for order management in billbee and szamla',
    )
    .setVersion('1.0')
    .build();

  app.use(
    '/doc',
    expressBasicAuth({
      challenge: true,
      users: {
        szamlazz: 'szamlazz',
      },
    }),
  );

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();

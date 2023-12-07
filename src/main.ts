import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: '*',
  });

  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Nodejs36')
    .addBearerAuth()
    .setDescription('AirBnB Swagger')
    .setVersion('v1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);

  await app.listen(8080);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const port = +process.env.NESTJS_APP_DOCKER_PORT;
  const app = await NestFactory.create(AppModule);
  app.enableCors({ credentials: true, origin: 'http://localhost:5173' });
  app.use(cookieParser());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Not Your Todos')
    .setDescription('Procrastination Productivity')
    .setVersion('0.0.1')
    .addCookieAuth('jwt_token')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api-docs', app, swaggerDocument);
  await app.listen(port);
}
bootstrap();

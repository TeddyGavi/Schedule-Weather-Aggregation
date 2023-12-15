import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

console.log(process.env.DB_HOST, process.env.DB_PASSWORD);
async function bootstrap() {
  const port = +process.env.NESTJS_APP_DOCKER_PORT;
  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Not Your Todos')
    .setDescription('Procrastination Productivity')
    .setVersion('0.0.1')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api-docs', app, swaggerDocument);
  await app.listen(port);
}
bootstrap();

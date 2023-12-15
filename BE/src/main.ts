import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

console.log(process.env.DB_HOST, process.env.DB_PASSWORD);
async function bootstrap() {
  const port = +process.env.NESTJS_APP_DOCKER_PORT;
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
}
bootstrap();

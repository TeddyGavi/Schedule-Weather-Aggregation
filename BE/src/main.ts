import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UsersService } from './users/users.service';

console.log(process.env.DB_HOST, process.env.DB_PASSWORD);
async function bootstrap() {
  const port = +process.env.NESTJS_APP_DOCKER_PORT;
  const app = await NestFactory.create(AppModule);
  const userService = app.get(UsersService);
  await userService.seedUsers(5);
  await app.listen(port);
}
bootstrap();

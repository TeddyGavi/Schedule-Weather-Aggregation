import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DBModule } from 'db/db.module';
import { UsersModule } from './users/users.module';
import { TodosModule } from './todos/todos.module';
import { SeedService } from 'db/seed.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [DBModule, UsersModule, TodosModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, SeedService],
})
export class AppModule {}

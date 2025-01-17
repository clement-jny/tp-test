import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';

const orm = TypeOrmModule.forRoot({
  type: 'sqlite',
  database: 'db.sqlite',
  entities: [__dirname + '/**/entities/*.entity{.ts,.js}'],
  synchronize: true,
});

@Module({
  imports: [UsersModule, orm],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

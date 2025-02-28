import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { AuthService } from './auth/auth.service';
// import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';

const orm = TypeOrmModule.forRoot({
  type: 'sqlite',
  database: 'db.sqlite',
  entities: [__dirname + '/**/entities/*.entity{.ts,.js}'],
  synchronize: true,
});

@Module({
  imports: [orm, UsersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

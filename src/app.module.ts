import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './module/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      port: 5432,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      host:'localhost',
      models: [],
      autoLoadModels: true,
      synchronize: true,
      logging: false,
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }

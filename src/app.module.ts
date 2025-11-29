import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'admin',
      autoLoadModels: true,
      synchronize: true,
      logging: false,
    }),
    ProductModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }

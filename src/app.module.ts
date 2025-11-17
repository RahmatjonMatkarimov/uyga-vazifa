import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductModule } from './module/product/product.module';
import { Product } from './module/product/entities/product.entity';
import { AuthModule } from './module/auth/auth.module';
import { UploadModule } from './module/upload/upload.module';

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
      models: [Product],
      autoLoadModels: true,
      synchronize: true,
      logging: false,
    }),
    ProductModule,
    AuthModule,
    UploadModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }

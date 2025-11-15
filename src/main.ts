import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted:false
  }));
  const PORT = process.env.PORT ?? 3000
  app.enableCors()
  await app.listen(PORT, () => {
    console.log("server is runint at:", PORT)
  });
}
bootstrap();

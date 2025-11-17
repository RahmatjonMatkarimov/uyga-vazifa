import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: false
  }));
  const PORT = process.env.PORT ?? 3000
  app.enableCors()

  //Upload static
  app.useStaticAssets(join(process.cwd(), "uploads"), {
    prefix: "/uploads"
  })

  //swagger
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api_docs', app, documentFactory);


  await app.listen(PORT, () => {
    console.log("http://localhost:" + PORT)
    console.log("http://localhost:" + PORT+"/api_docs")
  });
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { GlobalFilter } from '@/common/filter/global/global.filter';
import { PrismaFilter } from '@/common/filter/prisma/prisma.filter';
import { AuthGuard } from '@/common/guard/auth/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('luntan example')
    .setDescription('The luntan API description')
    .setVersion('1.0')
    .addTag('luntan')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.enableCors();

  app.useGlobalFilters(new GlobalFilter());
  app.useGlobalFilters(new PrismaFilter());

  app.useGlobalGuards(new AuthGuard());

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();

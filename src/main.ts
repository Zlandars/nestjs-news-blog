import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as expressHbs from 'express-handlebars';
import * as hbs from 'hbs';
import * as cookieParser from 'cookie-parser';
import * as process from 'process';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  app.enableCors();
  app.use(cookieParser());
  app.useStaticAssets(join(__dirname, '.', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  app.engine(
    'hbs',
    expressHbs({
      layoutsDir: join(__dirname, '..', 'views/layouts'),
      defaultLayouts: 'layout',
      extname: 'hbs',
    }),
  );
  hbs.registerPartials(__dirname + '/views/partials');

  // Validation swagger
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  // Swagger
  const config = new DocumentBuilder()
    .setTitle('API новостного блога')
    .setDescription('Всем методы по взаимодействию с API')
    .setVersion('1.0')
    .addTag('news, comments, users, calculator')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(parseInt(process.env.PORT));
}

bootstrap();

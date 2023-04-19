import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { resolve } from 'path';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import { AppModule } from './app.module';
import { LoggerInterceptor } from './interceptors/log.interceptor';
import * as basicAuth from 'express-basic-auth';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(resolve('./src/public'));
  app.setBaseViewsDir(resolve('./src/views'));
  app.setViewEngine('hbs');
  app.use(
    ['/api/v1/doc', '/api/v1/doc/*'],
    basicAuth({ challenge: true, users: { [process.env.SWAGGER_USERNAME]: process.env.SWAGGER_PASSWORD } }),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  //Swagger
  const config = new DocumentBuilder()
    .setTitle('Api Fintrix V1')
    .setDescription(
      'Fintrix é um aplicativo de controle financeiro para famílias que permite o monitoramento das despesas e receitas de todos os membros em um só lugar. Ele oferece recursos para orçamento, divisão de contas e planejamento financeiro. Com Fintrix, é fácil manter as finanças da família em ordem.',
    )
    .setVersion('1.0')
    .setTermsOfService('https://fintrix.com.br')
    .setContact('Rafael Araujo', 'https://fintrix.com.br', 'rflaraujodev@gmail.com')
    .addServer('https://apifintrixv1.up.railway.app', 'railway')
    .addServer('http://localhost:3000', 'local')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        in: 'header',
        name: 'JWT',
        description: 'JWT Token',
      },
      'JWT',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1/doc', app, document);
  app.useGlobalInterceptors(new LoggerInterceptor());
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Authorization, X-Requested-With',
  });
  await app.listen(process.env.PORT || 3000);
}
bootstrap();

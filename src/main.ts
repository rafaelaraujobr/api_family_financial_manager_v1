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
  app.setBaseViewsDir(resolve('./src/views'));
  app.useStaticAssets(resolve('./src/public'));
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
    .setTitle('Api Fintrix')
    .setDescription(
      `Fintrix é um aplicativo de controle financeiro para famílias que permite o monitoramento das despesas e receitas de todos os membros em um só lugar.<br> Ele oferece recursos para orçamento, divisão de contas e planejamento financeiro.
       Com Fintrix, é fácil manter as finanças da família em ordem.`,
    )
    .setVersion('1.0')
    .setTermsOfService('https://fintrix.com.br')
    .setContact('Rafael Araujo', 'https://fintrix.com.br', 'rflaraujodev@gmail.com')
    .setLicense('MIT', 'https://opensource.org/licenses/MIT')
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
  SwaggerModule.setup('api/v1/doc', app, document, {
    customSiteTitle: 'Fintrix API - Swagger',
    customCssUrl: '/swagger/theme-feeling-blue.css',
    customCss: `
    .topbar-wrapper a img {content: url("https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png");} 
    .swagger-ui .topbar {  background-color: #000000}
    .scheme-container {background-color: #fafafa !important;}`,
    customfavIcon: '/swagger/favicon.ico',
    swaggerOptions: {
      docExpansion: 'none',
      showRequestDuration: true,
    },
  });
  app.useGlobalInterceptors(new LoggerInterceptor());
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type, Accept, Authorization, X-Requested-With, X-Refresh-Token',
  });
  await app.listen(process.env.PORT || 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();

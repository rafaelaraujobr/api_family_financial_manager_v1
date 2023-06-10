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
      `<p>A API do Fintrix é uma poderosa ferramenta para auxiliar no controle financeiro de famílias. Com recursos abrangentes para gerenciar carteiras, estabelecer metas financeiras e registrar transações, o Fintrix oferece uma solução completa para manter suas finanças pessoais organizadas e sob controle.</p>
      <h2>Arquitetura</h2>
      <ol>
        <li>
          <h3>Modelagem de banco de dados</h3>
          <p>
          <center><img src="/swagger/erd.svg"></center>
          </p>
        </li>
      </ol>`,
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
    customCssUrl: '/swagger/theme-custom.css',
    customCss: `
    .topbar-wrapper a img {content: url("https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png");} 
    .swagger-ui .topbar {  background-color: #040404}
    .swagger-ui button.btn, .opblock-summary-method, .opblock, .content-type, .microlight, .modal-ux, input{ border-radius: 8px !important;}
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

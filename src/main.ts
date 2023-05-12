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
      `<h1>Bem-vindo à API do Fintrix - Controle Financeiro Familiar!</h1>
      <p>A API do Fintrix é uma poderosa ferramenta para auxiliar no controle financeiro de famílias. Com recursos abrangentes para gerenciar carteiras, estabelecer metas financeiras e registrar transações, o Fintrix oferece uma solução completa para manter suas finanças pessoais organizadas e sob controle.</p>
      <h2>Principais recursos da API:</h2>
      <ol>
        <li>
          <h3>Gerenciamento de Carteiras</h3>
          <p>Crie e gerencie várias carteiras para acompanhar diferentes aspectos das suas finanças, como contas bancárias, investimentos e dinheiro em espécie. A API do Fintrix permite que você adicione, atualize, visualize e remova carteiras conforme necessário.</p>
        </li>
        <li>
          <h3>Estabelecimento de Metas Financeiras</h3>
          <p>Defina metas financeiras claras e alcançáveis para economizar dinheiro, pagar dívidas ou atingir outros objetivos financeiros importantes. Com a API do Fintrix, você pode criar metas, monitorar o progresso e receber atualizações sobre o desempenho em relação às metas definidas.</p>
        </li>
        <li>
          <h3>Registro de Transações</h3>
          <p>Registre suas transações financeiras, como despesas, receitas e transferências, para ter um registro completo das suas atividades financeiras. A API do Fintrix permite que você adicione detalhes relevantes, como a categoria da transação e a data, para melhor análise e rastreamento.</p>
        </li>
        <li>
          <h3>Análise e Relatórios</h3>
          <p>Acesse informações detalhadas sobre suas finanças por meio de recursos de análise e relatórios. Obtenha insights valiosos sobre seus gastos, receitas, tendências financeiras e muito mais, para uma compreensão completa da sua situação financeira.</p>
        </li>
      </ol>
      <p>Com a API do Fintrix, você terá controle total sobre seu controle financeiro familiar. Seja você um desenvolvedor criando um aplicativo financeiro personalizado ou um usuário final que deseja integrar o Fintrix a outras ferramentas, nossa API oferece a flexibilidade e os recursos necessários para atender às suas necessidades.</p>
      <p>Comece a explorar a API do Fintrix hoje mesmo e aproveite os benefícios de um controle financeiro eficiente e organizado para toda a sua família.</p>`,
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

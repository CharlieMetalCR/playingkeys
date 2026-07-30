import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.enableCors({
    origin: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3001, '0.0.0.0');
  console.log(`API running on http://0.0.0.0:${process.env.PORT ?? 3001}/api`);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.enableCors({
    origin: ['http://localhost:8081', 'http://localhost:3000', 'http://localhost:19006'],
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3001);
  console.log(`API running on http://localhost:${process.env.PORT ?? 3001}/api`);
}
bootstrap();

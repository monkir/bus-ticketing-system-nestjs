import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import session from 'express-session'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false
    })
  );
  await app.listen(3100);//It should be at last in this scope
}
bootstrap();

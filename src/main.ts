import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';
import { DatabaseModule } from './database/database.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.get(DatabaseModule).importData();
  await app.listen(app.get(ConfigService).serverPort);
}
bootstrap();

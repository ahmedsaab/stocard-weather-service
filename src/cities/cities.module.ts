import { Module } from '@nestjs/common';
import { CitiesController } from './cities.controller';
import { CitiesService } from './cities.service';
import { ConfigModule } from '../config/config.module';
import { cityProviders } from './cities.provider';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [ConfigModule, DatabaseModule],
  controllers: [CitiesController],
  providers: [
    ...cityProviders,
    CitiesService,
  ],
})
export class CitiesModule {}

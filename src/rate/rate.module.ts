import { Module } from '@nestjs/common';
import { RateService } from './rate.service';

@Module({
  controllers: [],
  providers: [RateService]
})
export class RateModule {}

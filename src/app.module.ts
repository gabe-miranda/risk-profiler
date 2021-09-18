import { Module } from '@nestjs/common';
import { RiskModule } from './risk/risk.module';

@Module({
  imports: [RiskModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

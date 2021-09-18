import { Controller, Post } from '@nestjs/common';
import { RiskProfile } from './risk.model';
import { RiskService } from './risk.service';

@Controller('risk')
export class RiskController {
  constructor(private riskService: RiskService) {}

  @Post('profile')
  calculateRiskProfile(): RiskProfile {
    return this.riskService.calculateRiskProfile();
  }
}

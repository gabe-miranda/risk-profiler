import { Body, Controller, Post } from '@nestjs/common';
import { CalculateRiskDto } from './dto/calculate-risk.dto';
import { RiskProfile } from './risk.model';
import { RiskService } from './risk.service';

@Controller('risk')
export class RiskController {
  constructor(private riskService: RiskService) {}

  @Post('profile')
  calculateRiskProfile(@Body() body: CalculateRiskDto): RiskProfile {
    return this.riskService.calculateRiskProfile(body);
  }
}

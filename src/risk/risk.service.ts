import { Injectable } from '@nestjs/common';
import { CalculateRiskDto } from './dto/calculate-risk.dto';
import { RiskProfile, RiskProfileStatus } from './risk.model';

@Injectable()
export class RiskService {
  private riskProfile: RiskProfile = {
    auto: RiskProfileStatus.REGULAR,
    disability: RiskProfileStatus.INELEGIBLE,
    home: RiskProfileStatus.ECONOMIC,
    life: RiskProfileStatus.REGULAR,
  };

  calculateRiskProfile(body: CalculateRiskDto): RiskProfile {
    console.log(body);
    return this.riskProfile;
  }
}

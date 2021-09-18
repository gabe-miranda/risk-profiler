import { Injectable } from '@nestjs/common';
import { RiskProfile, RiskProfileStatus } from './risk.model';

@Injectable()
export class RiskService {
  private riskProfile: RiskProfile = {
    auto: RiskProfileStatus.REGULAR,
    disability: RiskProfileStatus.INELEGIBLE,
    home: RiskProfileStatus.ECONOMIC,
    life: RiskProfileStatus.REGULAR,
  };

  calculateRiskProfile(): RiskProfile {
    return this.riskProfile;
  }
}

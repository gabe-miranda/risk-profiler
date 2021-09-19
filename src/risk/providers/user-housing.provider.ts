import { CalculateRiskDto } from '../dto/calculate-risk.dto';
import {
  RiskProfile,
  RiskProfileStatus,
} from '../interfaces/risk-profile.interface';
import { RiskScore } from '../interfaces/risk-score.interface';
import { RiskProvider } from '../interfaces/risk-provider.interface';
import { OwnershipStatus } from '../models/house.model';

export class UserHousingRiskProvider implements RiskProvider {
  calculateRisk(
    body: CalculateRiskDto,
    riskScore: RiskScore,
    riskProfile: RiskProfile,
  ): void {
    if (!body.house) {
      riskProfile.home = RiskProfileStatus.INELEGIBLE;
      return;
    }

    if (body.house.ownership_status === OwnershipStatus.MORTGAGED) {
      riskScore.home += 1;
      riskScore.disability += 1;
    }

    return;
  }
}

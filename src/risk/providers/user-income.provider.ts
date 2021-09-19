import { CalculateRiskDto } from '../dto/calculate-risk.dto';
import {
  RiskProfile,
  RiskProfileStatus,
} from '../interfaces/risk-profile.interface';
import { RiskScore } from '../interfaces/risk-score.interface';
import { RiskProvider } from '../interfaces/risk-provider.interface';

export class UserIncomeRiskProvider implements RiskProvider {
  calculateRisk(
    body: CalculateRiskDto,
    riskScore: RiskScore,
    riskProfile: RiskProfile,
  ): void {
    if (body.income === 0) {
      riskProfile.disability = RiskProfileStatus.INELEGIBLE;
    }

    if (body.income > 200000) {
      Object.keys(riskScore).forEach((key) => {
        riskScore[key] -= 1;
      });
    }

    return;
  }
}

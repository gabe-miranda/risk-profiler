import { CalculateRiskDto } from '../dto/calculate-risk.dto';
import {
  RiskProfile,
  RiskProfileStatus,
} from '../interfaces/risk-profile.interface';
import { RiskScore } from '../interfaces/risk-score.interface';
import { RiskProvider } from '../interfaces/risk-provider.interface';

export class UserAgeRiskProvider implements RiskProvider {
  calculateRisk(
    body: CalculateRiskDto,
    riskScore: RiskScore,
    riskProfile: RiskProfile,
  ): void {
    if (body.age > 60) {
      riskProfile.disability = RiskProfileStatus.INELIGIBLE;
      riskProfile.life = RiskProfileStatus.INELIGIBLE;
      return;
    } else if (body.age >= 30 && body.age <= 40) {
      this.deductRiskFromAllInsuranceLines(riskScore, 1);
      return;
    } else if (body.age < 30) {
      this.deductRiskFromAllInsuranceLines(riskScore, 2);
      return;
    }

    return;
  }

  private deductRiskFromAllInsuranceLines(
    riskScore: RiskScore,
    amount: number,
  ): void {
    Object.keys(riskScore).forEach((key) => {
      riskScore[key] -= amount;
    });

    return;
  }
}

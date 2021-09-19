import { CalculateRiskDto, MaritalStatus } from '../dto/calculate-risk.dto';
import { RiskProfile } from '../interfaces/risk-profile.interface';
import { RiskProvider } from '../interfaces/risk-provider.interface';
import { RiskScore } from '../interfaces/risk-score.interface';

export class UserFamilyRiskProvider implements RiskProvider {
  calculateRisk(
    body: CalculateRiskDto,
    riskScore: RiskScore,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    riskProfile: RiskProfile,
  ): void {
    if (body.dependents > 0) {
      riskScore.disability += 1;
      riskScore.life += 1;
    }

    if (body.marital_status === MaritalStatus.MARRIED) {
      riskScore.disability -= 1;
      riskScore.life += 1;
    }

    return;
  }
}

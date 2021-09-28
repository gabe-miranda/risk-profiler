import { CalculateRiskDto } from '../dto/calculate-risk.dto';
import { RiskProfile } from '../interfaces/risk-profile.interface';
import { RiskProvider } from '../interfaces/risk-provider.interface';
import { RiskScore } from '../interfaces/risk-score.interface';

export class UserQuestionsRiskProvider implements RiskProvider {
  calculateRisk(
    body: CalculateRiskDto,
    riskScore: RiskScore,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    riskProfile: RiskProfile,
  ): void {
    if (body.risk_questions[1] === 1) {
      riskScore.disability += 2;
    }
  }
}

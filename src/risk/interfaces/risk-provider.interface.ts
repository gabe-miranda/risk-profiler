import { CalculateRiskDto } from '../dto/calculate-risk.dto';
import { RiskProfile } from './risk-profile.interface';
import { RiskScore } from './risk-score.interface';

export interface RiskProvider {
  calculateRisk(
    body: CalculateRiskDto,
    riskScore: RiskScore,
    riskProfile: RiskProfile,
  ): void;
}

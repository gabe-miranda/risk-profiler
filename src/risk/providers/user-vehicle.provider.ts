import { CalculateRiskDto } from '../dto/calculate-risk.dto';
import {
  RiskProfile,
  RiskProfileStatus,
} from '../interfaces/risk-profile.interface';
import { RiskScore } from '../interfaces/risk-score.interface';
import { RiskProvider } from '../interfaces/risk-provider.interface';

export class UserVehicleRiskProvider implements RiskProvider {
  calculateRisk(
    body: CalculateRiskDto,
    riskScore: RiskScore,
    riskProfile: RiskProfile,
  ): void {
    if (!body.vehicle) {
      riskProfile.auto = RiskProfileStatus.INELEGIBLE;
      return;
    }

    const currentTime = new Date();
    const actualYear: number = currentTime.getFullYear();
    if (actualYear - body.vehicle.year <= 5) {
      riskScore.auto += 1;
    }

    return;
  }
}

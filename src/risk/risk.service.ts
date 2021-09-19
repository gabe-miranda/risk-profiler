import { Injectable } from '@nestjs/common';
import { CalculateRiskDto } from './dto/calculate-risk.dto';
import {
  RiskProfile,
  RiskProfileStatus,
} from './interfaces/risk-profile.interface';
import { RiskScore } from './interfaces/risk-score.interface';
import { RiskProvider } from './interfaces/risk-provider.interface';
import { UserAgeRiskProvider } from './providers/user-age.provider';
import { UserHousingRiskProvider } from './providers/user-housing.provider';
import { UserIncomeRiskProvider } from './providers/user-income.provider';
import { UserVehicleRiskProvider } from './providers/user-vehicle.provider';
import { UserFamilyRiskProvider } from './providers/user-family.provider';

@Injectable()
export class RiskService {
  private providers: RiskProvider[] = [
    new UserIncomeRiskProvider(),
    new UserAgeRiskProvider(),
    new UserHousingRiskProvider(),
    new UserVehicleRiskProvider(),
    new UserFamilyRiskProvider(),
  ];

  calculateRiskProfile(body: CalculateRiskDto): RiskProfile {
    return this.resolveRiskScore(body);
  }

  private resolveRiskScore(body: CalculateRiskDto): RiskProfile {
    const riskProfile = new RiskProfile();
    const totalScore: RiskScore = this.getTotalScore(body.risk_questions);

    this.providers.map((provider) => {
      provider.calculateRisk(body, totalScore, riskProfile);
    });

    return this.mapRiskScoreToRiskProfile(totalScore, riskProfile);
  }

  private getTotalScore(risk_questions: number[]): RiskScore {
    const baseScore = this.getBaseScore(risk_questions);

    return {
      auto: baseScore,
      disability: baseScore,
      home: baseScore,
      life: baseScore,
    };
  }

  private getBaseScore(risk_questions: number[]): number {
    return risk_questions.reduce((total, actual) => total + actual);
  }

  private mapRiskScoreToRiskProfile(
    riskScore: RiskScore,
    riskProfile: RiskProfile,
  ): RiskProfile {
    Object.keys(riskScore).forEach((key) => {
      if (riskProfile[key] === RiskProfileStatus.INELIGIBLE) {
        return;
      }
      if (riskScore[key] <= 0) {
        riskProfile[key] = RiskProfileStatus.ECONOMIC;
      } else if (riskScore[key] >= 1 && riskScore[key] <= 2) {
        riskProfile[key] = RiskProfileStatus.REGULAR;
      } else if (riskScore[key] >= 3) {
        riskProfile[key] = RiskProfileStatus.RESPONSIBLE;
      }
    });

    return riskProfile;
  }
}

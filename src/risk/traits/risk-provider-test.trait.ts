import { CalculateRiskDto } from 'src/risk/dto/calculate-risk.dto';
import { RiskScore } from 'src/risk/interfaces/risk-score.interface';

export class RiskProviderTestTrait {
  createCalculateRiskDto(): CalculateRiskDto {
    return {
      age: 36,
      dependents: 1,
      house: {
        ownership_status: 'owned',
      },
      income: 120000,
      marital_status: 'married',
      risk_questions: [0, 0, 0],
      vehicle: {
        year: 2018,
      },
    };
  }

  getZeroRiskScore(): RiskScore {
    return {
      auto: 0,
      disability: 0,
      home: 0,
      life: 0,
    };
  }
}

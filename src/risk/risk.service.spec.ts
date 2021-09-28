import { Test, TestingModule } from '@nestjs/testing';
import {
  RiskProfile,
  RiskProfileStatus,
} from './interfaces/risk-profile.interface';
import { RiskService } from './risk.service';

describe('RiskService', () => {
  let service: RiskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RiskService],
    }).compile();

    service = module.get<RiskService>(RiskService);
  });

  it('should calculate and return risk profile', () => {
    const expectedResponse = new RiskProfile();
    expectedResponse.auto = RiskProfileStatus.ECONOMIC;
    expectedResponse.disability = RiskProfileStatus.ECONOMIC;
    expectedResponse.home = RiskProfileStatus.ECONOMIC;
    expectedResponse.life = RiskProfileStatus.ECONOMIC;
    expectedResponse.renters = RiskProfileStatus.INELIGIBLE;

    expect(
      service.calculateRiskProfile({
        age: 29,
        dependents: 0,
        house: {
          ownership_status: 'owned',
        },
        income: 250000,
        marital_status: 'single',
        risk_questions: [0, 1, 0],
        vehicle: {
          year: 2014,
        },
      }),
    ).toStrictEqual(expectedResponse);
  });
});

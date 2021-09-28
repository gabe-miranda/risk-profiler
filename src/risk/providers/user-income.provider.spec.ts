import { Test, TestingModule } from '@nestjs/testing';
import { RiskProviderTestTrait } from '../traits/risk-provider-test.trait';
import {
  RiskProfile,
  RiskProfileStatus,
} from '../interfaces/risk-profile.interface';
import { UserIncomeRiskProvider } from './user-income.provider';

describe('UserIncomeRiskProvider', () => {
  let provider: UserIncomeRiskProvider;
  let trait: RiskProviderTestTrait;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserIncomeRiskProvider, RiskProviderTestTrait],
    }).compile();

    trait = module.get<RiskProviderTestTrait>(RiskProviderTestTrait);
    provider = module.get<UserIncomeRiskProvider>(UserIncomeRiskProvider);
  });

  it('should set disability insurance line to ineligible when user does not have income', () => {
    const requestBody = trait.createCalculateRiskDto();
    const riskScore = trait.getZeroRiskScore();
    const riskProfile = new RiskProfile();

    requestBody.income = 0;
    provider.calculateRisk(requestBody, riskScore, riskProfile);

    const expectedRiskScore = {
      auto: 0,
      disability: 0,
      home: 0,
      life: 0,
      renters: 0,
    };

    expect(riskScore).toEqual(expectedRiskScore);
    expect(riskProfile.disability).toBe(RiskProfileStatus.INELIGIBLE);
  });

  it('should deduct one point from all insurance lines when user income is above $200k', () => {
    const requestBody = trait.createCalculateRiskDto();
    const riskScore = trait.getZeroRiskScore();
    const riskProfile = new RiskProfile();

    requestBody.income = 220000;
    provider.calculateRisk(requestBody, riskScore, riskProfile);

    const expectedRiskScore = {
      auto: -1,
      disability: -1,
      home: -1,
      life: -1,
      renters: -1,
    };

    expect(riskScore).toEqual(expectedRiskScore);
  });
});

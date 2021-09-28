import { Test, TestingModule } from '@nestjs/testing';
import { RiskProviderTestTrait } from '../traits/risk-provider-test.trait';
import {
  RiskProfile,
  RiskProfileStatus,
} from '../interfaces/risk-profile.interface';
import { UserAgeRiskProvider } from './user-age.provider';

describe('UserAgeRiskProvider', () => {
  let provider: UserAgeRiskProvider;
  let trait: RiskProviderTestTrait;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserAgeRiskProvider, RiskProviderTestTrait],
    }).compile();

    trait = module.get<RiskProviderTestTrait>(RiskProviderTestTrait);
    provider = module.get<UserAgeRiskProvider>(UserAgeRiskProvider);
  });

  it('should set disability and life insurance lines to ineligible and should not change risk score when user age is over 60 years old', () => {
    const requestBody = trait.createCalculateRiskDto();
    const riskScore = trait.getZeroRiskScore();
    const riskProfile = new RiskProfile();

    requestBody.age = 65;
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
    expect(riskProfile.life).toBe(RiskProfileStatus.INELIGIBLE);
  });

  it('should deduct one point from risk score when user age is between 30 and 40 years old', () => {
    const requestBody = trait.createCalculateRiskDto();
    const riskScore = trait.getZeroRiskScore();
    const riskProfile = new RiskProfile();

    requestBody.age = 35;
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

  it('should deduct two points from risk score when user age is under 30 years old', () => {
    const requestBody = trait.createCalculateRiskDto();
    const riskScore = trait.getZeroRiskScore();
    const riskProfile = new RiskProfile();

    requestBody.age = 25;
    provider.calculateRisk(requestBody, riskScore, riskProfile);

    const expectedRiskScore = {
      auto: -2,
      disability: -2,
      home: -2,
      life: -2,
      renters: -2,
    };

    expect(riskScore).toEqual(expectedRiskScore);
  });
});

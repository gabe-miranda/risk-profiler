import { Test, TestingModule } from '@nestjs/testing';
import { RiskProviderTestTrait } from '../traits/risk-provider-test.trait';
import { RiskProfile } from '../interfaces/risk-profile.interface';
import { UserFamilyRiskProvider } from './user-family.provider';
import { MaritalStatus } from '../dto/calculate-risk.dto';

describe('UserFamilyRiskProvider', () => {
  let provider: UserFamilyRiskProvider;
  let trait: RiskProviderTestTrait;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserFamilyRiskProvider, RiskProviderTestTrait],
    }).compile();

    trait = module.get<RiskProviderTestTrait>(RiskProviderTestTrait);
    provider = module.get<UserFamilyRiskProvider>(UserFamilyRiskProvider);
  });

  it('should add one point to disability and life risk score when user has dependents', () => {
    const requestBody = trait.createCalculateRiskDto();
    const riskScore = trait.getZeroRiskScore();
    const riskProfile = new RiskProfile();

    requestBody.dependents = 3;
    requestBody.marital_status = MaritalStatus.SINGLE;
    provider.calculateRisk(requestBody, riskScore, riskProfile);

    const expectedRiskScore = {
      auto: 0,
      disability: 1,
      home: 0,
      life: 1,
    };

    expect(riskScore).toEqual(expectedRiskScore);
  });

  it('should remove one point from disability and add one to life risk score when user is married', () => {
    const requestBody = trait.createCalculateRiskDto();
    const riskScore = trait.getZeroRiskScore();
    const riskProfile = new RiskProfile();

    requestBody.dependents = 0;
    requestBody.marital_status = MaritalStatus.MARRIED;
    provider.calculateRisk(requestBody, riskScore, riskProfile);

    const expectedRiskScore = {
      auto: 0,
      disability: -1,
      home: 0,
      life: 1,
    };

    expect(riskScore).toEqual(expectedRiskScore);
  });

  it('should add points to life and disability based on both rules when user is married and has dependents', () => {
    const requestBody = trait.createCalculateRiskDto();
    const riskScore = trait.getZeroRiskScore();
    const riskProfile = new RiskProfile();

    requestBody.dependents = 2;
    requestBody.marital_status = MaritalStatus.MARRIED;
    provider.calculateRisk(requestBody, riskScore, riskProfile);

    const expectedRiskScore = {
      auto: 0,
      disability: 0,
      home: 0,
      life: 2,
    };

    expect(riskScore).toEqual(expectedRiskScore);
  });
});

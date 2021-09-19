import { Test, TestingModule } from '@nestjs/testing';
import { RiskProviderTestTrait } from '../traits/risk-provider-test.trait';
import {
  RiskProfile,
  RiskProfileStatus,
} from '../interfaces/risk-profile.interface';
import { UserVehicleRiskProvider } from './user-vehicle.provider';

describe('UserVehicleRiskProvider', () => {
  let provider: UserVehicleRiskProvider;
  let trait: RiskProviderTestTrait;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserVehicleRiskProvider, RiskProviderTestTrait],
    }).compile();

    trait = module.get<RiskProviderTestTrait>(RiskProviderTestTrait);
    provider = module.get<UserVehicleRiskProvider>(UserVehicleRiskProvider);
  });

  it('should set auto insurance line to ineligible when user does not have a car', () => {
    const requestBody = trait.createCalculateRiskDtoWithoutVehicle();
    const riskScore = trait.getZeroRiskScore();
    const riskProfile = new RiskProfile();

    provider.calculateRisk(requestBody, riskScore, riskProfile);

    const expectedRiskScore = {
      auto: 0,
      disability: 0,
      home: 0,
      life: 0,
    };

    expect(riskScore).toEqual(expectedRiskScore);
    expect(riskProfile.auto).toBe(RiskProfileStatus.INELIGIBLE);
  });

  it('should add one point to auto insurance line when user vehicle was produced in the last 5 years', () => {
    const requestBody = trait.createCalculateRiskDto();
    const riskScore = trait.getZeroRiskScore();
    const riskProfile = new RiskProfile();
    const currentTime = new Date();

    requestBody.vehicle.year = currentTime.getFullYear() - 2;
    provider.calculateRisk(requestBody, riskScore, riskProfile);

    const expectedRiskScore = {
      auto: 1,
      disability: 0,
      home: 0,
      life: 0,
    };

    expect(riskScore).toEqual(expectedRiskScore);
  });
});

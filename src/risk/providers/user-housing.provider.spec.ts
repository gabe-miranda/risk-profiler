import { Test, TestingModule } from '@nestjs/testing';
import { RiskProviderTestTrait } from '../traits/risk-provider-test.trait';
import {
  RiskProfile,
  RiskProfileStatus,
} from '../interfaces/risk-profile.interface';
import { UserHousingRiskProvider } from './user-housing.provider';
import { OwnershipStatus } from '../models/house.model';

describe('UserHousingRiskProvider', () => {
  let provider: UserHousingRiskProvider;
  let trait: RiskProviderTestTrait;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserHousingRiskProvider, RiskProviderTestTrait],
    }).compile();

    trait = module.get<RiskProviderTestTrait>(RiskProviderTestTrait);
    provider = module.get<UserHousingRiskProvider>(UserHousingRiskProvider);
  });

  it('should set home and renters insurance line to ineligible when user does not have a house', () => {
    const requestBody = trait.createCalculateRiskDtoWithoutHouse();
    const riskScore = trait.getZeroRiskScore();
    const riskProfile = new RiskProfile();

    provider.calculateRisk(requestBody, riskScore, riskProfile);

    const expectedRiskScore = {
      auto: 0,
      disability: 0,
      home: 0,
      life: 0,
      renters: 0,
    };

    expect(riskScore).toEqual(expectedRiskScore);
    expect(riskProfile.home).toBe(RiskProfileStatus.INELIGIBLE);
    expect(riskProfile.renters).toEqual(RiskProfileStatus.INELIGIBLE);
  });

  it('should add one point to home and disability risk score when user have a mortgaged house', () => {
    const requestBody = trait.createCalculateRiskDto();
    const riskScore = trait.getZeroRiskScore();
    const riskProfile = new RiskProfile();

    requestBody.house.ownership_status = OwnershipStatus.MORTGAGED;
    provider.calculateRisk(requestBody, riskScore, riskProfile);

    const expectedRiskScore = {
      auto: 0,
      disability: 1,
      home: 1,
      life: 0,
      renters: 0,
    };

    expect(riskScore).toEqual(expectedRiskScore);
  });

  it('should have home insurance line disabled when user have a rented house', () => {
    const requestBody = trait.createCalculateRiskDto();
    const riskScore = trait.getZeroRiskScore();
    const riskProfile = new RiskProfile();

    requestBody.house.ownership_status = OwnershipStatus.RENTED;
    provider.calculateRisk(requestBody, riskScore, riskProfile);

    expect(riskProfile.home).toEqual(RiskProfileStatus.INELIGIBLE);
  });

  it('should have renters insurance line disabled when user owns house', () => {
    const requestBody = trait.createCalculateRiskDto();
    const riskScore = trait.getZeroRiskScore();
    const riskProfile = new RiskProfile();

    requestBody.house.ownership_status = OwnershipStatus.OWNED;
    provider.calculateRisk(requestBody, riskScore, riskProfile);

    expect(riskProfile.renters).toEqual(RiskProfileStatus.INELIGIBLE);
  });

  it('should have renters insurance line disabled when user have a mortgaged house', () => {
    const requestBody = trait.createCalculateRiskDto();
    const riskScore = trait.getZeroRiskScore();
    const riskProfile = new RiskProfile();

    requestBody.house.ownership_status = OwnershipStatus.MORTGAGED;
    provider.calculateRisk(requestBody, riskScore, riskProfile);

    expect(riskProfile.renters).toEqual(RiskProfileStatus.INELIGIBLE);
  });
});

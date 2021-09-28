import { Test, TestingModule } from '@nestjs/testing';
import { RiskProfile } from '../interfaces/risk-profile.interface';
import { RiskProviderTestTrait } from '../traits/risk-provider-test.trait';
import { UserQuestionsRiskProvider } from './user-questions.provider';

describe('UserQuestionsRiskProvider', () => {
  let provider: UserQuestionsRiskProvider;
  let trait: RiskProviderTestTrait;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserQuestionsRiskProvider, RiskProviderTestTrait],
    }).compile();

    trait = module.get<RiskProviderTestTrait>(RiskProviderTestTrait);
    provider = module.get<UserQuestionsRiskProvider>(UserQuestionsRiskProvider);
  });

  it('should add two points to the disability line if second risk question is true', () => {
    const requestBody = trait.createCalculateRiskDto();
    const riskScore = trait.getZeroRiskScore();
    const riskProfile = new RiskProfile();

    requestBody.risk_questions[1] = 1;
    provider.calculateRisk(requestBody, riskScore, riskProfile);

    const expectedRiskScore = {
      auto: 0,
      disability: 2,
      home: 0,
      life: 0,
      renters: 0,
    };

    expect(riskScore).toStrictEqual(expectedRiskScore);
  });

  it('should add zero points to the disability line if second risk question is false', () => {
    const requestBody = trait.createCalculateRiskDto();
    const riskScore = trait.getZeroRiskScore();
    const riskProfile = new RiskProfile();

    requestBody.risk_questions[1] = 0;
    provider.calculateRisk(requestBody, riskScore, riskProfile);

    const expectedRiskScore = {
      auto: 0,
      disability: 0,
      home: 0,
      life: 0,
      renters: 0,
    };

    expect(riskScore).toStrictEqual(expectedRiskScore);
  });
});

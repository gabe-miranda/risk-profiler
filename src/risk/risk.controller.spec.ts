import { Test, TestingModule } from '@nestjs/testing';
import { RiskController } from './risk.controller';
import {
  RiskProfile,
  RiskProfileStatus,
} from './interfaces/risk-profile.interface';
import { RiskService } from './risk.service';

describe('RiskController', () => {
  let controller: RiskController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RiskController],
      providers: [RiskService],
    }).compile();

    controller = module.get<RiskController>(RiskController);
  });

  it('should return calculated risk profile', () => {
    const requestBody = {
      age: 35,
      dependents: 2,
      house: { ownership_status: 'owned' },
      income: 0,
      marital_status: 'married',
      risk_questions: [1, 0, 1],
      vehicle: { year: 2020 },
    };

    const expectedResponse: RiskProfile = new RiskProfile();
    expectedResponse.auto = RiskProfileStatus.REGULAR;
    expectedResponse.disability = RiskProfileStatus.INELEGIBLE;
    expectedResponse.home = RiskProfileStatus.REGULAR;
    expectedResponse.life = RiskProfileStatus.RESPONSIBLE;

    expect(controller.calculateRiskProfile(requestBody)).toStrictEqual(
      expectedResponse,
    );
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { RiskController } from './risk.controller';
import { RiskProfile, RiskProfileStatus } from './risk.model';
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
      marital_status: 'single',
      risk_questions: [0, 1, 0],
      vehicle: { year: 2020 },
    };

    const expectedResponse: RiskProfile = {
      auto: RiskProfileStatus.REGULAR,
      disability: RiskProfileStatus.INELEGIBLE,
      home: RiskProfileStatus.ECONOMIC,
      life: RiskProfileStatus.REGULAR,
    };

    expect(controller.calculateRiskProfile(requestBody)).toStrictEqual(
      expectedResponse,
    );
  });
});

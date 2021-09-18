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
    const expectedResponse: RiskProfile = {
      auto: RiskProfileStatus.REGULAR,
      disability: RiskProfileStatus.INELEGIBLE,
      home: RiskProfileStatus.ECONOMIC,
      life: RiskProfileStatus.REGULAR,
    };

    expect(controller.calculateRiskProfile()).toStrictEqual(expectedResponse);
  });
});
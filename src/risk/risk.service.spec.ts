import { Test, TestingModule } from '@nestjs/testing';
import { RiskProfile, RiskProfileStatus } from './risk.model';
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
    const expectedResponse: RiskProfile = {
      auto: RiskProfileStatus.REGULAR,
      disability: RiskProfileStatus.INELEGIBLE,
      home: RiskProfileStatus.ECONOMIC,
      life: RiskProfileStatus.REGULAR,
    };

    expect(service.calculateRiskProfile()).toStrictEqual(expectedResponse);
  });
});

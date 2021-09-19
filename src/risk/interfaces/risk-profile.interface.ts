export class RiskProfile {
  auto: RiskProfileStatus;
  disability: RiskProfileStatus;
  home: RiskProfileStatus;
  life: RiskProfileStatus;
}

export enum RiskProfileStatus {
  REGULAR = 'regular',
  RESPONSIBLE = 'responsible',
  ECONOMIC = 'economic',
  INELIGIBLE = 'ineligible',
}

export interface RiskProfile {
  auto: RiskProfileStatus;
  disability: RiskProfileStatus;
  home: RiskProfileStatus;
  life: RiskProfileStatus;
}

export enum RiskProfileStatus {
  REGULAR = 'regular',
  ECONOMIC = 'economic',
  INELEGIBLE = 'ineligible',
}

export class InvestmentPreferences {
  constructor(
    public clientId: string,
    public investmentPurpose: string,
    public riskTolerance: string,
    public incomeCategory: string,
    public investmentLength: string
  ) {}
}

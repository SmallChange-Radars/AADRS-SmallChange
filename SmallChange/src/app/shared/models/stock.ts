export class Stock {
  constructor(
    public Symbol: string,
    public Name: string,
    public Sector: string,
    public Price: number[],
    public PricePerEarnings: number,
    public Dividend_Yield: number,
    public EarningsPerShare: number,
    public Low_52_Week: number,
    public High_52_Week: number,
    public Market_Cap: number,
    public EBITDA: number,
    public PricePerSales: number,
    public PricePerBook: number,
    public SEC_Filings: string
  ) {}
}

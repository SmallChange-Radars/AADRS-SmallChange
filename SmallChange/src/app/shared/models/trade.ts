export class Trade {
  constructor(
    public Symbol: string,
    public Name: string,
    public Sector: string,
    public Price: number[],
    public Market_Cap: number
  ) {}
}

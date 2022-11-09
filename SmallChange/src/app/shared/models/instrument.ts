export class Instrument {
  constructor(
    public instrumentId: string,
    public instrumentDescription: string,
    public categoryId: string,
    public askPrice: number,
    public bidPrice: number,
    public minQuantity: number,
    public maxQuantity: number
  ) {}
}

export class ClientPortfolio {
    constructor(
        public instrumentId: string,
        public quantity: number,
        public currentPrice: number,
        public value: number,
        public gains: number,
        public returns: number
    ) {}
}
// stockname
// total quantity
// list of list price quantity

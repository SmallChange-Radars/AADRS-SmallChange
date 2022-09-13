export class Stock {
    constructor(
        public name: string,
        public symbol: string,
        public volume: number,
        public priceArray: number[],
        public market: string
    ) { }
}

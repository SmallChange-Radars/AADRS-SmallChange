import { PortfolioValue } from "./portfolio-value";

export class Portfolio {
    constructor(
        public id: string,
        public Stock: string,
        public Prices: number[],
        public Quantities: number[]  
    ) {}
}

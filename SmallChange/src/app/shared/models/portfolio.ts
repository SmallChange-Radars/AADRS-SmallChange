import { PortfolioValue } from "./portfolio-value";

export class Portfolio {
    constructor(
        public clientId: string,
        public instrumentId: string,
        public quantity: number,
        public value: number  
    ) {}
}

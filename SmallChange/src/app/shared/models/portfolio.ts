import { PortfolioValue } from "./portfolio-value";

export class Portfolio {
    constructor(
        public id: string,
        public value: PortfolioValue[]
    ) {}
}

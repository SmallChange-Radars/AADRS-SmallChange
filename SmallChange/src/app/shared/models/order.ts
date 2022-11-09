export class Order {
    constructor(
        public instrumentId: string,
        public direction: string,
        public quantity:number,
        public targetPrice:number
        ) { }
}


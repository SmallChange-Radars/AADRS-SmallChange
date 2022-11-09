import { Stock } from "./stock";

export class Activity {
    constructor(
        public id: string,
        public instrumentId: string,
        public quantity: number,
        public cashValue: number,
        public direction: string,
        public timestamp: string
    ){}
}

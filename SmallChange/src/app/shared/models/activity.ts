import { Stock } from "./stock";

export class Activity {
    constructor(
        public stock: Stock,
        public quantity: number,
        public price: number,
        public typeOfTransaction: string,
        public time: string
    ){}
}

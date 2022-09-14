import { Stock } from "./stock";

export class Activity {
    constructor(
        public Stock: string,
        public Quantity: number,
        public Price: number,
        public Type: string,
        public Date: Date
    ){}
}

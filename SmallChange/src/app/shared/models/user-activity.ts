import { Activity } from "./activity";

export class UserActivity {
    
    constructor(
        public id: string,
        public value: Activity[]=[]
    ){}
}

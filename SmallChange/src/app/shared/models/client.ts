import { ClientIdentification } from "./client-identification";

export class Client {

    constructor(
        public clientId: string,
        public email: string, 
        public dateOfBirth: string, 
        public country: string,
        public postalCode: string,
        public identification: ClientIdentification[]) { }
}

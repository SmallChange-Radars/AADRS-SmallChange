import { ClientIdentification } from "./client-identification";

export class Client {
    public clientId: string;
    public email: string;
    public dateOfBirth: string;
    public country: string;
    public postalCode: string;
    public identification: ClientIdentification[];

    constructor(clientId: string, email: string, dateOfBirth: string, country: string, postalCode: string, identification: ClientIdentification[]){
        this.clientId=clientId;
        this.email=email;
        this.dateOfBirth=dateOfBirth;
        this.country=country;
        this.postalCode=postalCode;
        this.identification=identification;
    }
}

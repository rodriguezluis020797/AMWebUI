import { BaseDTO } from './BaseDTO';

export class ClientDTO extends BaseDTO {
    clientId: string;
    firstName: string;
    middleName?: string | null;
    lastName: string;
    phoneNumber: string;

    constructor() {
        super();
        this.clientId = '';
        this.firstName = '';
        this.middleName = '';
        this.lastName = '';
        this.phoneNumber = '';
    }
}
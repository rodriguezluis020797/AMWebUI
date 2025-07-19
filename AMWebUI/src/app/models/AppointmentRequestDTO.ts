import { BaseDTO } from "./BaseDTO";

export class AppointmentRequestDTO extends BaseDTO {
    providerId: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    phoneNumber: string;
    confirmPhoneNumber: string;
    date: string;
    flexible: boolean;
    acknowledged: boolean;
    acknowledgedDate: string;
    accepted: boolean;
    comments?: string;

    constructor() {
        super();
        this.providerId = '';
        this.firstName = '';
        this.middleName = '';
        this.lastName = '';
        this.phoneNumber = '';
        this.confirmPhoneNumber = '';
        this.date = new Date().toISOString();
        this.flexible = false;
        this.acknowledged = false;
        this.acknowledgedDate = new Date().toISOString();
        this.accepted = false;
        this.comments = '';
    }
}
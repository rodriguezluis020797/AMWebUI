import { BaseDTO } from "./BaseDTO";

export class ServiceDTO extends BaseDTO {
    serviceId: string;
    name: string;
    description: string;
    price: number;
    allowClientScheduling: boolean;

    constructor() {
        super();
        this.serviceId = '';
        this.name = '';
        this.description = '';
        this.price = 0.0;
        this.allowClientScheduling = false;
    }
}
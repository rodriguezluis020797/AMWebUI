import { BaseDTO } from "./BaseDTO";
import { AppointmentStatusEnum } from "./Enums";

export class AppointmentDTO extends BaseDTO {
    appointmentId: string;
    serviceId: string;
    clientId: string;
    clientName: string;
    serviceName: string;
    startDate: string;
    endDate: string;
    notes: string;
    status: AppointmentStatusEnum;
    price: number;
    overridePrice: boolean;

    constructor() {
        super();
        this.appointmentId = '';
        this.serviceId = '';
        this.clientId = '';
        this.clientName = '';
        this.serviceName = '';
        this.startDate = new Date().toISOString();
        this.endDate = new Date().toISOString();
        this.notes = '';
        this.status = AppointmentStatusEnum.Select;
        this.price = 0.0;
        this.overridePrice = false;
    }
}
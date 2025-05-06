import { BaseDTO } from "./BaseDTO";
import { AppointmentStatusEnum } from "./Enums";

export class AppointmentDTO extends BaseDTO {
    appointmentId: string;
    serviceId: string;
    clientId: string;
    startDate: string;
    endDate: string;
    notes: string;
    status: AppointmentStatusEnum;

    constructor() {
        super();
        this.appointmentId = '';
        this.serviceId = '';
        this.clientId = '';
        this.startDate = new Date().toISOString();
        this.endDate = new Date().toISOString();
        this.notes = '';
        this.status = AppointmentStatusEnum.Unknown;
    }
}
export { AppointmentStatusEnum };


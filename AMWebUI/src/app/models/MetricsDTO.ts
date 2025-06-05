import { BaseDTO } from "./BaseDTO";
import { AppointmentDTO } from "./AppointmentDTO"; // assuming it's defined in a separate file

export class MetricsDTO extends BaseDTO {
    startDate: string;
    endDate: string;
    appointments: AppointmentDTO[];
    serviceNames: { [key: string]: string };
    totalEarnings: number;
    totalScheduledProjectedEarnings: number;
    totalCompletedEarnings: number;

    constructor() {
        super();
        this.startDate = '';
        this.endDate = '';
        this.appointments = [];
        this.serviceNames = {};
        this.totalEarnings = 0;
        this.totalScheduledProjectedEarnings = 0;
        this.totalCompletedEarnings = 0;
    }
}
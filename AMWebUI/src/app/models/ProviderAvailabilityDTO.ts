import { BaseDTO } from "./BaseDTO";
import { DayOfWeek } from "./Enums";

export class ProviderAvailabilityDTO extends BaseDTO {
    dayOfWeek: DayOfWeek;    // Enum (0 = Sunday, 6 = Saturday)
    available: boolean;
    startTime: string;       // Represented as ISO 8601 time string, e.g., "09:00:00"
    endTime: string;
    constructor() {
        super();
        this.dayOfWeek = DayOfWeek.Monday;
        this.available = false;
        this.startTime = '';
        this.endTime = '';
    }
}
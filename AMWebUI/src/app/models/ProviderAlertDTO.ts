import { BaseDTO } from "./BaseDTO";

export class ProviderAlertDTO extends BaseDTO {
    providerAlertId: string;
    alert: string;

    constructor() {
        super();
        this.providerAlertId = '';
        this.alert = '';
    }
}
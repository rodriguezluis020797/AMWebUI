import { BaseDTO } from "./BaseDTO";
import { ProviderAvailabilityDTO } from "./ProviderAvailabilityDTO";
import { ProviderReviewDTO } from "./ProviderReviewDTO";
import { ServiceDTO } from "./ServiceDTO";

export class PoviderPublicViewDTO extends BaseDTO {
    providerName: string;
    providerDescription: string;
    providerReviews: ProviderReviewDTO[];
    availabilities: ProviderAvailabilityDTO[];
    services: ServiceDTO[];

    constructor() {
        super();
        this.providerName = '';
        this.providerDescription = ''
        this.providerReviews = [];
        this.availabilities = [];
        this.services = [];
    }
}
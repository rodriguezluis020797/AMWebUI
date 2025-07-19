import { BaseDTO } from "./BaseDTO";
import { ProviderAvailabilityDTO } from "./ProviderAvailabilityDTO";
import { ProviderReviewDTO } from "./ProviderReviewDTO";
import { ServiceDTO } from "./ServiceDTO";

export class PoviderPublicViewDTO extends BaseDTO {
    providerId: string;
    providerName: string;
    providerDescription: string;
    providerReviews: ProviderReviewDTO[];
    availabilities: ProviderAvailabilityDTO[];
    services: ServiceDTO[];

    constructor() {
        super();
        this.providerId = '';
        this.providerName = '';
        this.providerDescription = ''
        this.providerReviews = [];
        this.availabilities = [];
        this.services = [];
    }
}
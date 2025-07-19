import { BaseDTO } from "./BaseDTO";
import { ProviderAvailabilityDTO } from "./ProviderAvailabilityDTO";
import { ProviderReviewDTO } from "./ProviderReviewDTO";

export class PoviderPublicViewDTO extends BaseDTO {
    providerName: string;
    providerDescription: string;
    providerReviews: ProviderReviewDTO[];
    availabilities: ProviderAvailabilityDTO[];

    constructor() {
        super()
        this.providerName = '';
        this.providerDescription = ''
        this.providerReviews = [];
        this.availabilities = [];
    }
}
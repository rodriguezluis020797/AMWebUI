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
    facebookURL: string | undefined;
    instagramURL: string | undefined;
    xURL: string | undefined;
    linkedInURL: string | undefined;
    youTubeURL: string | undefined;
    tikTokURL: string | undefined;

    constructor() {
        super();
        this.providerId = '';
        this.providerName = '';
        this.providerDescription = ''
        this.providerReviews = [];
        this.availabilities = [];
        this.services = [];
        this.facebookURL = '';
        this.instagramURL = '';
        this.xURL = '';
        this.linkedInURL = '';
        this.youTubeURL = '';
        this.tikTokURL = '';
    }
}
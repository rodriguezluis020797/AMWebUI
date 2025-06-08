import { BaseDTO } from "./BaseDTO";
import { ProviderReviewDTO } from "./ProviderReviewDTO";

export class PoviderPublicViewDTO extends BaseDTO {
    providerName: string;
    providerDescription: string;
    providerReviews: ProviderReviewDTO[];

    constructor() {
        super()
        this.providerName = '';
        this.providerDescription = ''
        this.providerReviews = [];
    }
}
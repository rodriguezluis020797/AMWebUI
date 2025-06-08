import { BaseDTO } from "./BaseDTO";

export class ProviderReviewDTO extends BaseDTO {
    providerReviewId: string;
    providerGuid: string;
    providerName: string;
    clientName: string;
    guidQuery: string;
    reviewText: string;
    rating: number;
    createDate: Date;

    constructor() {
        super()
        this.providerReviewId = '';
        this.providerGuid = '';
        this.providerName = '';
        this.clientName = '';
        this.guidQuery = '';
        this.reviewText = '';
        this.rating = 0;
        this.createDate = new Date();
    }
}
import { BaseDTO } from "./BaseDTO";

export class ProviderReviewDTO extends BaseDTO {
    providerReviewId: string;
    providerName: string;
    guidQuery: string;
    reviewText: string;
    rating: number;
    createDate: Date;

    constructor() {
        super()
        this.providerReviewId = '';
        this.providerName = 'A Name';
        this.guidQuery = '';
        this.reviewText = '';
        this.rating = 0;
        this.createDate = new Date();
    }
}
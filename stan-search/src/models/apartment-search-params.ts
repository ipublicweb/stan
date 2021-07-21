export class ApartmentSearchParams {
    priceFrom: number;
    priceTo: number;
    m2From: number;

    constructor(priceFrom: number, priceTo: number, m2From: number) {
        this.priceFrom = priceFrom;
        this.priceTo = priceTo;
        this.m2From = m2From;
    }
}

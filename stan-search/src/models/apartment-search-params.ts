export class ApartmentSearchParams {
    priceFrom: number;
    priceTo: number;
    maxResultCount: number = 100

    constructor(priceFrom: number, priceTo: number) {
        this.priceFrom = priceFrom;
        this.priceTo = priceTo;
    }
}

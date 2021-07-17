export class ApartmentSearchParams {
    priceFrom: number;
    priceTo: number;
    maxResultCount: number = 10*1000

    constructor(priceFrom: number, priceTo: number) {
        this.priceFrom = priceFrom;
        this.priceTo = priceTo;
    }
}

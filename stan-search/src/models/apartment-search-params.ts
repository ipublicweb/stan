export class ApartmentSearchParams {
    priceFrom: number;
    sizeFrom: number;

    constructor(priceFrom: number, sizeFrom: number) {
        this.priceFrom = priceFrom;
        this.sizeFrom = sizeFrom;
    }
}

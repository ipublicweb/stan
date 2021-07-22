export class ApartmentSearchParams {
    priceFrom: number;
    priceTo: number;
    m2From: number;
    notGroundLevel?: boolean;
    notLastFloor?: boolean;
    locations: LOCATION[];

    constructor(priceFrom: number, priceTo: number, m2From: number,
                notGroundLevel: boolean, notLastFloor: boolean, locations: LOCATION[]) {
        this.priceFrom = priceFrom;
        this.priceTo = priceTo;
        this.m2From = m2From;
        this.notGroundLevel = notGroundLevel;
        this.notLastFloor = notLastFloor;
        this.locations = locations;
    }
}

export enum LOCATION {
    BULEVAR_OSLOBODJENJA,
    BANATIC,
    ROTKVARIJA,
    SAJMISTE,
    LIMAN,
}

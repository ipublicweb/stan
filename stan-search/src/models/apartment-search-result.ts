import { Apartment } from "./apartment";
import { ApartmentSearchParams } from "./apartment-search-params";

export class ApartmentSearchResult {

    apartmentSearchParams: ApartmentSearchParams

    allApartments: Apartment[] = [];

    constructor(apartmentSearchParams: ApartmentSearchParams) {
        this.apartmentSearchParams = apartmentSearchParams;
    }
}

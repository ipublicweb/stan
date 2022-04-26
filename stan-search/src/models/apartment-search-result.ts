import { Apartment } from "./apartment";
import { ApartmentSearchParams } from "./apartment-search-params";

export class ApartmentSearchResult {

    apartmentSearchParams: ApartmentSearchParams
    allApartments: Apartment[];
    cityExpertApartmentsCount: number;
    cetriZidaApartmentsCount: number;

    constructor(apartmentSearchParams: ApartmentSearchParams,
                cityExpertApartments: Apartment[],
                cetriZidaApartments: Apartment[]) {

        this.apartmentSearchParams = apartmentSearchParams;

        this.cityExpertApartmentsCount = cityExpertApartments.length;
        this.cetriZidaApartmentsCount = cetriZidaApartments.length;

        this.allApartments = [ ...cityExpertApartments, ...cetriZidaApartments ];
    }

    setAllApartments(filteredApartments: Apartment[]) {
        this.allApartments = filteredApartments;
    }
}

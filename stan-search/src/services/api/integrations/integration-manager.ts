import { CityExpert } from "./city-expert/city-expert";
import { Apartment, APARTMENT_COMPARATOR, ApartmentSearchParams } from "../../../models";
import { CetriZida } from "./4-zida/4-zida";
import { ApartmentSearchResult } from "../../../models/apartment-search-result";

class IntegrationServicesManager {

    // Instances of all integrated resources
    private cityExpert = new CityExpert();
    private cetriZida = new CetriZida();

    findApartments(params: ApartmentSearchParams): Promise<ApartmentSearchResult> {
        return new Promise<ApartmentSearchResult>(resolve => {
            Promise.all([
                this.cityExpert.findApartments(params),
                this.cetriZida.findApartments(params),
            ]).then(integrationResults => {
                const cityExpertApartments = integrationResults[0];
                const cetriZidaApartments = integrationResults[1];

                const result = new ApartmentSearchResult(params, cityExpertApartments, cetriZidaApartments);
                calculateScoresAndSort(result.allApartments);
                resolve(result);
            })
        })
    }
}

export const IntegrationManager = new IntegrationServicesManager();

const calculateScoresAndSort = (apartments: Apartment[]) => {
    apartments.forEach(apartment => {
        if (apartment.pricePerSize > 0) {
            apartment.score = PRICE_PER_SIZE_TO_SCORE(apartment.pricePerSize).toFixed(2);
        }
    });
    apartments.sort(APARTMENT_COMPARATOR);
}

const PRICE_PER_SIZE_TO_SCORE = (score: number) => {
    return 1 - MAP_RANGE(score, 1, 4000, 0, 1);
}

const MAP_RANGE = (value: number, in_min: number, in_max: number, out_min: number, out_max: number) => {
    return (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

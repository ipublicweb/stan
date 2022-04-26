import { CityExpert } from "./integrations/city-expert/city-expert";
import { Apartment, APARTMENT_COMPARATOR, ApartmentSearchParams } from "../../../models";
import { CetriZida } from "./integrations/4-zida/4-zida";
import { ApartmentSearchResult } from "../../../models/apartment-search-result";
import { FilterApi } from "./filters/filter-api";
import { FilterIsGroundLevel } from "./filters/filter-is-ground-level";
import { FilterIsLastFloor } from "./filters/filter-is-last-floor";
import { FilterIsManualExcluded } from "./filters/filter-is-manual-excluded";
import { FilterIsExcluded } from "./filters/filter-is-excluded";

const FILTERS: FilterApi[] = [
    new FilterIsManualExcluded(),
    new FilterIsExcluded(),
    new FilterIsGroundLevel(),
    new FilterIsLastFloor(),
];

class ApartmentSearchManager {

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

                const filteredApartments = filterApartments(params, result.allApartments);
                result.setAllApartments(filteredApartments);

                calculateScoresAndSortApartments(result.allApartments);

                resolve(result);
            })
        })
    }
}

export const APARTMENT_SEARCH_MANAGER = new ApartmentSearchManager();

const filterApartments = (params: ApartmentSearchParams, apartments: Apartment[]) => {
    return apartments.filter(apartment => {
        let notExcluded = true
        for (const filter of FILTERS) {
            if (filter.filterOut(params, apartment)) {
                notExcluded = false;
                break;
            }
        }
        return notExcluded;
    })
}

const calculateScoresAndSortApartments = (apartments: Apartment[]) => {
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

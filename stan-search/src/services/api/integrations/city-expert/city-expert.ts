import { IntegrationApi } from "../integration-api";
import { Apartment, ApartmentSearchParams } from "../../../../models";
import axios from "axios";
import { City } from "./constants";
import { CITY_EXPERT_INTEGRATION_ENABLED, CITY_EXPERT_INTEGRATION_MOCKED } from "../integration-configuration";
import { API_SEARCH_MOCK } from "./mock-data";

export class CityExpert implements IntegrationApi {

    // Source:
    // https://cityexpert.rs/prodaja-stanova-novi-sad?minPrice=50000&maxPrice=100000

    findApartments(params: ApartmentSearchParams): Promise<Apartment[]> {
        return new Promise<Apartment[]>((resolve) => {

            if (!CITY_EXPERT_INTEGRATION_ENABLED) {
                resolve([])
                return;
            }

            if (CITY_EXPERT_INTEGRATION_MOCKED) {
                const response = API_SEARCH_MOCK;
                const apartments = this.mapDataToApartments(response);
                resolve(apartments)
                return;
            }

            const data = this.constructSearchParams(params)
            axios.post(`https://cityexpert.rs/api/Search/`, data, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
            }).then(response => {
                const apartments = this.mapDataToApartments(response);
                resolve(apartments)
            })
        })
    }

    mapDataToApartments(response: any): Apartment[] {
        const result = response.data.result;
        console.info(response)
        console.info("ccccccccccc" + result.length)
        const apartments: Apartment[] = [];
        return apartments;
    }

    constructSearchParams(params: ApartmentSearchParams) {
        return {
            ptId: [],
            cityId: City.NOVI_SAD,
            rentOrSale: "s",
            currentPage: 1,
            resultsPerPage: params.maxResultCount,
            floor: [],
            avFrom: false,
            underConstruction: false,
            furnished: [],
            furnishingArray: [],
            heatingArray: [],
            parkingArray: [],
            petsArray: [],
            minPrice: params.priceFrom,
            maxPrice: params.priceTo,
            minSize: null,
            maxSize: null,
            polygonsArray: [],
            searchSource: "regular",
            sort: "datedsc",
            structure: [],
            propIds: [],
            filed: [],
            ceiling: [],
            bldgOptsArray: [],
            joineryArray: [],
            yearOfConstruction: [],
            otherArray: [],
            numBeds: null,
            category: null,
            maxTenants: null,
            extraCost: null,
            numFloors: null,
            numBedrooms: null,
            numToilets: null,
            numBathrooms: null,
            heating: null,
            bldgEquipment: [],
            cleaning: null,
            extraSpace: [],
            parking: null,
            parkingIncluded: null,
            parkingExtraCost: null,
            parkingZone: null,
            petsAllowed: null,
            smokingAllowed: null,
            aptEquipment: [],
            site: "SR"
        }
    }
}

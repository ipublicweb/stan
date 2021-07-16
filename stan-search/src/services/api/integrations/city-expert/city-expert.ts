import { IntegrationApi } from "../integration-api";
import { Apartment, ApartmentSearchParams } from "../../../../models";
import axios from "axios";
import { City, Structure } from "./constants";
import { CITY_EXPERT_INTEGRATION_ENABLED, CITY_EXPERT_INTEGRATION_MOCKED } from "../integration-configuration";
import { API_SEARCH_MOCK } from "./mock-data";
import { Integrations } from "../../../../models/enumerations/Integrations";
import { AgencyLink } from "../../../../models/agency-link";

const BASE_URL = "https://cityexpert.rs";

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
                const apartments = this.mapDataToApartments(API_SEARCH_MOCK);
                resolve(apartments)
                return;
            }

            const data = this.constructSearchParams(params)
            axios.post(BASE_URL + `/api/Search/`, data, {
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
        return result.map((data: any) => {

            // parse floor data
            const floorData: string = data.floor.split("_");
            const floor = floorData.length > 0 ? Number.parseInt(floorData[0]) : -1;
            const floorsInBuilding = floorData.length > 1 ? Number.parseInt(floorData[1]) : -1;

            const apartment =  new Apartment(
                data.propId,
                data.street,
                data.size,
                data.price,
                data.structure,
                floor,
                floorsInBuilding,
                data.polygons,
                Integrations.CITY_EXPERT,
            );

            apartment.agencyLinks.push(this.constructLinkToAgencySite(apartment));

            return apartment
        })
    }

    constructLinkToAgencySite(apartment: Apartment): AgencyLink {
        // @ts-ignore
        const structure = Structure[apartment.structure];
        const place = "-novi-sad";

        const linkDescription = structure + place;
        const link = BASE_URL + "/prodaja/stan/" + apartment.agencyId + "/" + linkDescription;
        return new AgencyLink(link, true, Integrations.CITY_EXPERT);
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

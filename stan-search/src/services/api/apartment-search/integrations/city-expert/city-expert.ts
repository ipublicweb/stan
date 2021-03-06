import { getAxiosConfig, getPagesToFetch, IntegrationApi } from "../integration-api";
import { Apartment, ApartmentSearchParams, LOCATION } from "../../../../../models";
import { City, Structure } from "./constants";
import { CITY_EXPERT_INTEGRATION_ENABLED, CITY_EXPERT_INTEGRATION_MOCKED } from "../integration-configuration";
import { API_SEARCH_MOCK } from "./mock-response";
import { Integrations } from "../../../../../models/enumerations/Integrations";
import { AgencyLink } from "../../../../../models/agency-link";
import axios from "axios";
import { UNKNOWN_NUMBER } from "../../../../../utils/general-utils";

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
                const apartments = this.mapToApartments(API_SEARCH_MOCK.data.result);
                resolve(apartments)
                return;
            }

            this.findApartmentsOnPage(params, 1)
                .then(firstResponse => {
                    const apartments = this.mapToApartments(firstResponse.data.result);
                    const totalResultCount = firstResponse.data.info.documentCount;
                    const pagesToFetch = getPagesToFetch(totalResultCount, this.getMaxResultsPerPage());
                    if (pagesToFetch.length) {
                        Promise.all(pagesToFetch.map(page => this.findApartmentsOnPage(params, page)))
                            .then(responses => {
                                    for (const r of responses) {
                                        apartments.push(...this.mapToApartments(r.data.result));
                                    }
                                    resolve(apartments)
                                }
                            )
                    } else {
                        resolve(apartments)
                    }
                })
        })
    }

    findApartmentsOnPage(params: ApartmentSearchParams, page: number): Promise<any> {
        const data = this.constructSearchParams(params, page)
        return axios.post(BASE_URL + `/api/Search/`, data, getAxiosConfig(BASE_URL))
    }

    getMaxResultsPerPage(): number {
        return 60;
    }

    mapToApartments(result: any): Apartment[] {
        return result.map((data: any) => {

            let floor = UNKNOWN_NUMBER;
            let floorsInBuilding = UNKNOWN_NUMBER;
            switch (data.floor) {
                case "PR":
                case "VPR":
                    floor = 0;
                    break;
                case "PTK":
                    floor = 1;
                    floorsInBuilding = 1;
                    break;
                default:
                    // parse floor data
                    const floorData: string = data.floor.split("_");
                    floor = floorData.length > 0 ? Number.parseInt(floorData[0]) : UNKNOWN_NUMBER;
                    floorsInBuilding = floorData.length > 1 ? Number.parseInt(floorData[1]) : UNKNOWN_NUMBER;
            }
            // console.warn("data: " + data.floor + " floor: " + floor + " floorsInBuilding: " + floorsInBuilding)

            const apartment = new Apartment();
            apartment.setSearchData(
                data.propId,
                data.firstPublished,
                data.street,
                data.size,
                data.price,
                data.structure,
                floor,
                floorsInBuilding,
                data.polygons,
                "",
                Integrations.CITY_EXPERT,
            );

            apartment.agencyLinks.push(this.constructLinkToAgencySite(apartment, data));

            return apartment
        })
    }

    constructLinkToAgencySite(apartment: Apartment, data: any): AgencyLink {
        // @ts-ignore
        const structure = Structure[apartment.structure];
        const place = "-novi-sad";

        const linkDescription = structure + place;
        const link = BASE_URL + "/prodaja/stan/" + apartment.agencyId + "/" + linkDescription;
        return new AgencyLink(link, true, Integrations.CITY_EXPERT);
    }

    constructSearchParams(params: ApartmentSearchParams, page: number) {
        const locations = params.locations.map(l => this.mapLocationsParam(l));
        return {
            ptId: [],
            cityId: City.NOVI_SAD,
            rentOrSale: "s",
            currentPage: page,
            resultsPerPage: this.getMaxResultsPerPage(),
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
            minSize: params.m2From,
            maxSize: null,
            polygonsArray: locations,
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

    mapLocationsParam(location: LOCATION): string {
        switch (location) {
            case LOCATION.BULEVAR_OSLOBODJENJA:
                return "";
            case LOCATION.BANATIC:
                return "Banati??";
            case LOCATION.ROTKVARIJA:
                return "Rotkvarija";
            case LOCATION.SAJMISTE:
                return "Sajmi??te";
            case LOCATION.LIMAN:
            default:
                return "Liman";
        }
    }
}

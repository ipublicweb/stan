import { getPagesToFetch, IntegrationApi } from "../integration-api";
import { Apartment, ApartmentSearchParams, LOCATION } from "../../../../models";
import axios from "axios";
import {
    CETRI_ZIDA_INTEGRATION_ENABLED, CETRI_ZIDA_INTEGRATION_MOCKED,
} from "../integration-configuration";
import { Integrations } from "../../../../models/enumerations/Integrations";
import { AgencyLink } from "../../../../models/agency-link";
import { API_SEARCH_MOCK, API_SEARCH_PREMIUM_MOCK } from "./mock-response";

const BASE_URL = "https://www.4zida.rs";
const API_BASE_URL = "https://api.4zida.rs";

export class CetriZida implements IntegrationApi {

    // Source:
    // https://api.4zida.rs/v6/search/apartments?for=sale&priceFrom=75000&priceTo=115000&page=1&placeIds%5B%5D=600
    // https://api.4zida.rs/v6/premium?for=sale&priceFrom=75000&priceTo=115000&type=apartment&placeIds%5B%5D=600

    findApartments(params: ApartmentSearchParams): Promise<Apartment[]> {
        return new Promise<Apartment[]>((resolve) => {

            if (!CETRI_ZIDA_INTEGRATION_ENABLED) {
                resolve([])
                return;
            }

            if (CETRI_ZIDA_INTEGRATION_MOCKED) {
                const apartmentsPremium = this.mapToApartments(API_SEARCH_PREMIUM_MOCK.data);
                const apartments = this.mapToApartments(API_SEARCH_MOCK.data.ads);
                resolve([ ...apartmentsPremium, ...apartments ])
                return;
            }

            const premiumParams = {...params}
            delete premiumParams.notGroundLevel;
            delete premiumParams.notLastFloor;
            const searchParams = this.constructSearchParams(premiumParams, -1)
            axios.get(API_BASE_URL + `/v6/premium?for=sale&type=apartment` + searchParams)
                .then(response => {
                    const apartmentsPremium = this.mapToApartments(response.data);

                    this.findApartmentsOnPage(params, 1)
                        .then(firstResponse => {
                            const apartments = this.mapToApartments(firstResponse.data.ads);
                            apartments.push(...apartmentsPremium);

                            const totalResultCount = firstResponse.data.total;
                            const pagesToFetch = getPagesToFetch(totalResultCount, this.getMaxResultsPerPage());
                            if (pagesToFetch.length) {
                                Promise.all(pagesToFetch.map(page => this.findApartmentsOnPage(params, page)))
                                    .then(responses => {
                                            for (const r of responses) {
                                                apartments.push(...this.mapToApartments(r.data.ads));
                                            }
                                            resolve(apartments)
                                        }
                                    )
                            } else {
                                resolve(apartments)
                            }
                        })
                })
        })
    }

    findApartmentsOnPage(params: ApartmentSearchParams, page: number): Promise<any> {
        const searchParams = this.constructSearchParams(params, page)
        return axios.get(API_BASE_URL +
            `/v6/search/apartments?for=sale` + searchParams);
    }

    getMaxResultsPerPage(): number {
        return 20;
    }

    mapToApartments(result: any): Apartment[] {
        return result.map((data: any) => {

            const structure = data.structureAbbreviation || data.roomCount || " stan"
            const structureClear = structure.replace(" stan", "");

            const apartment = new Apartment();
            apartment.setSearchData(
                data.id,
                data.createdAt,
                data.title,
                data.m2,
                data.price,
                structureClear,
                data.floor,
                data.totalFloors,
                data.placeNames,
                Integrations.CETRI_ZIDA,
            );

            apartment.agencyLinks.push(this.constructLinkToAgencySite(apartment, data));

            return apartment
        })
    }

    constructLinkToAgencySite(apartment: Apartment, data: any): AgencyLink {
        const url = data.urlPath;
        const link = url.startsWith(BASE_URL) ? url : BASE_URL + data.urlPath;
        return new AgencyLink(link, true, Integrations.CETRI_ZIDA);
    }

    constructSearchParams(params: ApartmentSearchParams, page: number) {
        const notGroundLevel = params.notGroundLevel ? "&firstFloor=-1" : "";
        const notLastFloor = params.notLastFloor ? "&lastFloor=-1" : "";
        const pageParam = page < 0 ? "" : `&page=${page}`;

        let locations = "";
        params.locations.forEach(l => {
            locations += this.mapLocationsParam(l);
        });

        return`&priceFrom=${params.priceFrom}&priceTo=${params.priceTo}&m2From=${params.m2From}`
            + notGroundLevel + notLastFloor + pageParam + locations
    }

    mapLocationsParam(location: LOCATION): string {
        switch (location) {
            case LOCATION.BULEVAR_OSLOBODJENJA:
                return "&placeIds%5B%5D=742";
            case LOCATION.BANATIC:
                return "&placeIds%5B%5D=618";
            case LOCATION.ROTKVARIJA:
                return "&placeIds%5B%5D=620";
            case LOCATION.SAJMISTE:
                return "&placeIds%5B%5D=617";
            case LOCATION.LIMAN:
                return "&placeIds%5B%5D=603";
            default:
                return "";
        }
    }
}

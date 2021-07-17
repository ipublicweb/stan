import { IntegrationApi } from "../integration-api";
import { Apartment, ApartmentSearchParams } from "../../../../models";
import axios from "axios";
import {
    CETRI_ZIDA_INTEGRATION_ENABLED, CETRI_ZIDA_INTEGRATION_MOCKED,
} from "../integration-configuration";
import { Integrations } from "../../../../models/enumerations/Integrations";
import { AgencyLink } from "../../../../models/agency-link";
import { City } from "./constants";
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

            axios.get(API_BASE_URL + `/v6/premium?for=sale&priceFrom=${params.priceFrom}&priceTo=${params.priceTo}&type=apartment&placeIds%5B%5D=${City.NOVI_SAD}`)
                .then(response => {
                    const apartmentsPremium = this.mapToApartments(response.data);

                    axios.get(API_BASE_URL + `/v6/search/apartments?for=sale&priceFrom=${params.priceFrom}&priceTo=${params.priceTo}&page=${1}&placeIds%5B%5D=${City.NOVI_SAD}`)
                        .then(response => {
                            const apartments = this.mapToApartments(response.data.ads);
                            const totalResults = response.data.total;
                            console.info({ totalResults })
                            resolve([ ...apartmentsPremium, ...apartments ])
                        })
                })
        })
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

}

import { Apartment, ApartmentSearchParams } from "../../../models";
import { AgencyLink } from "../../../models/agency-link";
import { AxiosRequestConfig } from "axios";

export interface IntegrationApi {

    findApartments(params: ApartmentSearchParams): Promise<Apartment[]>

    findApartmentsOnPage(params: ApartmentSearchParams, page: number): Promise<any>

    getMaxResultsPerPage(): number

    mapToApartments(result: any): Apartment[]

    constructLinkToAgencySite(apartment: Apartment, data: any): AgencyLink
}

// x-referal is custom header which value will be placed to referal and origin headers
export const getAxiosConfig = (baseUrl: string) => {
    const config: AxiosRequestConfig = {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "stan-referal": baseUrl,
        },
    };
    return config;
}

export const getPagesToFetch = (totalResultCount: number, maxResultsPerPage: number) => {
    const totalPagesCount = Math.ceil(totalResultCount / maxResultsPerPage);
    console.info({totalPagesCount})
    const totalPagesCountTemp = totalPagesCount > 3 ? 3 : totalPagesCount
    console.info({totalPagesCountTemp})
    return Array.from(Array(totalPagesCountTemp - 1).keys()).map(i => i + 2);
}

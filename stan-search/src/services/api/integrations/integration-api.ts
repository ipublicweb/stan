import { Apartment, ApartmentSearchParams } from "../../../models";
import { AgencyLink } from "../../../models/agency-link";

export interface IntegrationApi {

    findApartments(params: ApartmentSearchParams): Promise<Apartment[]>

    mapDataToApartments(response: any): Apartment[]

    constructLinkToAgencySite(apartment: Apartment): AgencyLink

    constructSearchParams(params: ApartmentSearchParams): object
}

import { Apartment, ApartmentSearchParams } from "../../../models";
import { AgencyLink } from "../../../models/agency-link";

export interface IntegrationApi {

    findApartments(params: ApartmentSearchParams): Promise<Apartment[]>

    mapToApartments(result: any): Apartment[]

    constructLinkToAgencySite(apartment: Apartment, data: any): AgencyLink

}

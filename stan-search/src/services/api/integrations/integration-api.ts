import { Apartment, ApartmentSearchParams } from "../../../models";

export interface IntegrationApi {

    findApartments(params: ApartmentSearchParams): Promise<Apartment[]>

}

import { Apartment, ApartmentSearchParams } from "../../../../models";

export interface FilterApi {

    /**
     * Returns true if apartment is satisfy filter condition - exclude
     * @param params
     * @param apartment
     */
    filterOut(params: ApartmentSearchParams, apartment: Apartment): boolean;

}

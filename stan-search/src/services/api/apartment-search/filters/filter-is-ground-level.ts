import { FilterApi } from "./filter-api";
import { Apartment, ApartmentSearchParams } from "../../../../models";
import { NOT_AVAILABLE } from "../../../../utils/general-utils";

export class FilterIsGroundLevel implements FilterApi {

    filterOut(params: ApartmentSearchParams, apartment: Apartment): boolean {
        if (params.notGroundLevel) {
            if (apartment.floor === 0) {
                console.warn("FilterIsGroundLevel-floor: ", { apartment })
                return true;
            }
            if (apartment.description !== NOT_AVAILABLE) {
                for (const excludeWord of GROUND_EXCLUDE_LIST) {
                    if (apartment.description.includes(excludeWord)) {
                        console.warn("FilterIsGroundLevel-exclude-word: ", { apartment })
                        return true;
                    }
                }
            }
        }
        return false;
    }
}

const GROUND_EXCLUDE_LIST = [
    "prizemlj",
]

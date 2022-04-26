import { FilterApi } from "./filter-api";
import { Apartment, ApartmentSearchParams } from "../../../../models";
import { NOT_AVAILABLE } from "../../../../utils/general-utils";

export class FilterIsExcluded implements FilterApi {

    filterOut(params: ApartmentSearchParams, apartment: Apartment): boolean {
        if (apartment.description !== NOT_AVAILABLE) {
            for (const excludeWord of EXCLUDE_LIST) {
                if (apartment.description.includes(excludeWord)) {
                    console.warn("FilterIsExcluded: " + excludeWord, { apartment })
                    return true;
                }
            }
        }
        return false;
    }
}

const EXCLUDE_LIST = [
    "nije uknji", // Nije uknjižen
]

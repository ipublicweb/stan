import { FilterApi } from "./filter-api";
import { Apartment, ApartmentSearchParams } from "../../../../models";

export class FilterIsManualExcluded implements FilterApi {

    filterOut(params: ApartmentSearchParams, apartment: Apartment): boolean {
        if (MANUAL_EXCLUDE_LIST.includes(apartment.manualId)) {
            console.warn("FilterIsManualExcluded: ", { apartment })
            return true;
        }
        return false;
    }

}

const MANUAL_EXCLUDE_LIST = [
    "manual-4_ZIDA-82600-3.0-60-0",
    "manual-4_ZIDA-109180-3.0-93-3",
]

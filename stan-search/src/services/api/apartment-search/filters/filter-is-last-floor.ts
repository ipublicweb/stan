import { FilterApi } from "./filter-api";
import { Apartment, ApartmentSearchParams } from "../../../../models";
import { NOT_AVAILABLE } from "../../../../utils/general-utils";

export class FilterIsLastFloor implements FilterApi {

    filterOut(params: ApartmentSearchParams, apartment: Apartment): boolean {
        if (params.notLastFloor) {
            if (apartment.floor > 0 && apartment.floorsInBuilding > 0) {
                if (apartment.floor === apartment.floorsInBuilding) {
                    console.warn("FilterIsLastFloor-floor: ", { apartment })
                    return true;
                }
            }
            if (apartment.description !== NOT_AVAILABLE) {
                for (const excludeWord of LAST_FLOOR_EXCLUDE_LIST) {
                    if (apartment.description.includes(excludeWord)) {
                        console.warn("FilterIsLastFloor-exclude-word: ", { apartment })
                        return true;
                    }
                }
            }
        }
        return false;
    }
}

const LAST_FLOOR_EXCLUDE_LIST = [
    "duplex",
    "dupleks",
]

import { Integrations } from "./enumerations/Integrations";
import { v4 as uuidv4 } from "uuid";
import { MatchedPredictors } from "./enumerations/MatchedPredictors";
import { AgencyLink } from "./agency-link";
import { isNotNil, NOT_AVAILABLE, UNKNOWN_NUMBER } from "../utils/general-utils";

const MAX_STREET_LENGTH = 28;

export class Apartment {
    id = uuidv4();
    manualId: string = NOT_AVAILABLE;
    agencyId: string = NOT_AVAILABLE;
    creationDate: string = NOT_AVAILABLE;
    street: string = NOT_AVAILABLE;
    size: number = UNKNOWN_NUMBER;
    price: number = UNKNOWN_NUMBER;
    pricePerSize: number = UNKNOWN_NUMBER;
    structure: string = NOT_AVAILABLE;
    floor: number = UNKNOWN_NUMBER;
    floorsInBuilding: number = UNKNOWN_NUMBER;
    polygons: any = [];
    description: string = NOT_AVAILABLE;
    integration: Integrations = Integrations.ALL;

    agencyLinks: AgencyLink[] = [];

    // calculated score
    score = "0.00";
    matchedPredictors = MatchedPredictors.UNKNOWN;

    setSearchData(agencyId: string, creationDate: string, street: string,
                  size: number, price: number, structure: string,
                  floor: number, floorsInBuilding: number, polygons: any,
                  description: string, integration: Integrations) {
        this.manualId = "manual-" + integration + "-" + price + "-" + structure + "-" + size + "-" + floor;
        if (isNotNil(agencyId)) {
            this.agencyId = agencyId;
        }
        if (isNotNil(creationDate)) {
            this.creationDate = formatDate(creationDate)
        }
        if (isNotNil(street)) {
            this.street = createShortStreet(street);
        }
        if (isNotNil(size)) {
            this.size = size;
        }
        if (isNotNil(price)) {
            this.price = price;
        }
        if (isNotNil(price) && isNotNil(size)) {
            this.pricePerSize = calculatePricePerSize(price, size);
        }
        if (isNotNil(structure)) {
            this.structure = structure;
        }
        if (isNotNil(floor)) {
            this.floor = floor;
        }
        if (isNotNil(floorsInBuilding)) {
            this.floorsInBuilding = floorsInBuilding;
        }
        if (isNotNil(polygons)) {
            this.polygons = polygons;
        }
        if (isNotNil(description)) {
            this.description = description.toLowerCase();
        }
        if (isNotNil(integration)) {
            this.integration = integration;
        }
    }
}

export const APARTMENT_COMPARATOR = (a: Apartment, b: Apartment) => {
    return b.score.localeCompare(a.score, undefined, {
        numeric: true,
        sensitivity: 'base'
    });
}

const formatDate = (date: string) => {
    if (date) {
        return (new Date(date)).toLocaleDateString();
    }
    return NOT_AVAILABLE;
}

const createShortStreet = (street: string) => {
    return street.length > MAX_STREET_LENGTH ? street.substr(0, MAX_STREET_LENGTH) + "..." : street;
}

const calculatePricePerSize = (price: number, size: number) => {
    const pricePerSize = price / size;
    return Math.round(pricePerSize)
}

import { Integrations } from "./enumerations/Integrations";
import { v4 as uuidv4 } from "uuid";
import { MatchedPredictors } from "./enumerations/MatchedPredictors";
import { AgencyLink } from "./agency-link";
import { NOT_AVAILABLE } from "../utils/general-utils";

const MAX_STREET_LENGTH = 28;

export class Apartment {
    id = uuidv4();
    agencyId: string = NOT_AVAILABLE;
    creationDate: string = NOT_AVAILABLE;
    street: string = NOT_AVAILABLE;
    size: number = -1;
    price: number = -1;
    pricePerSize: number = -1;
    structure: string = NOT_AVAILABLE;
    floor: number = -1;
    floorsInBuilding: number = -1;
    polygons: any = [];
    integration: Integrations = Integrations.ALL;

    agencyLinks: AgencyLink[] = [];

    // calculated score
    score = "0.00";
    matchedPredictors = MatchedPredictors.UNKNOWN;

    setSearchData(agencyId: string, creationDate: string, street: string,
                  size: number, price: number, structure: string,
                  floor: number, floorsInBuilding: number, polygons: any,
                  integration: Integrations) {
        this.agencyId = agencyId;
        this.creationDate = formatDate(creationDate)
        this.street = createShortStreet(street);
        this.size = size;
        this.price = price;
        this.pricePerSize = calculatePricePerSize(price, size);
        this.structure = structure;
        this.floor = floor;
        this.floorsInBuilding = floorsInBuilding;
        this.polygons = polygons;
        this.integration = integration;
    }
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

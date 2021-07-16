import { Integrations } from "./enumerations/Integrations";
import { v4 as uuidv4 } from "uuid";
import { MatchedPredictors } from "./enumerations/MatchedPredictors";
import { AgencyLink } from "./agency-link";

const MAX_STREET_LENGTH = 30;

export class Apartment {
    id = uuidv4();
    agencyId: string;
    street: string;
    size: number;
    price: number;
    pricePerSize: number;
    structure: string;
    floor: number;
    floorsInBuilding: number;
    polygons: any;
    integration: Integrations

    agencyLinks: AgencyLink[] = [];

    // calculated score
    score = "0.00";
    matchedPredictors = MatchedPredictors.UNKNOWN;

    constructor(agencyId: string, street: string, size: number, price: number, structure: string, floor: number, floorsInBuilding: number, polygons: any, integration: Integrations) {
        this.agencyId = agencyId;
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

const createShortStreet = (street: string) => {
    return street.length > MAX_STREET_LENGTH ? street.substr(0, MAX_STREET_LENGTH) + "..." : street;
}

const calculatePricePerSize = (price: number, size: number) => {
    const pricePerSize = price / size;
    return Math.round(pricePerSize)
}

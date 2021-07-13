import { Integrations } from "./enumerations/Integrations";
import { v4 as uuidv4 } from "uuid";

export class Apartment {
    id: string;
    name: string;
    size: number;
    integration: Integrations

    constructor(name: string, size: number, integration: Integrations) {
        this.id = uuidv4();
        this.name = name;
        this.size = size;
        this.integration = integration;
    }
}

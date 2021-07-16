import { Integrations } from "./enumerations/Integrations";
import { v4 as uuidv4 } from "uuid";

export class AgencyLink {
    id = uuidv4();
    link: string;
    available: boolean;
    integration: Integrations;

    constructor(link: string, available: boolean, integration: Integrations) {
        this.link = link;
        this.available = available;
        this.integration = integration;
    }
}

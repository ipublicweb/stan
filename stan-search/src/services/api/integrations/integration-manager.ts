import { CityExpert } from "./city-expert/city-expert";
import { Apartment, ApartmentSearchParams } from "../../../models";
import { CetriZida } from "./4-zida/4-zida";

class IntegrationServicesManager {

    // Instances of all integrated resources
    private cityExpert = new CityExpert();
    private cetriZida = new CetriZida();

    findApartments(params: ApartmentSearchParams): Promise<Apartment[]> {
        return this.cetriZida.findApartments(params);
    }
}

export const IntegrationManager = new IntegrationServicesManager();


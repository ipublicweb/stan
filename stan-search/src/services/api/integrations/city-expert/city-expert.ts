import { IntegrationApi } from "../integration-api";
import { Apartment, ApartmentSearchParams } from "../../../../models";
import { Integrations } from "../../../../models/enumerations/Integrations";

export class CityExpert implements IntegrationApi {

    findApartments(params: ApartmentSearchParams): Promise<Apartment[]> {
        return new Promise<Apartment[]>((resolve) => {
            const apartment: Apartment =
                new Apartment("test app name", 75, Integrations.CITY_EXPERT);
            resolve([ apartment ])
        })
    }

}

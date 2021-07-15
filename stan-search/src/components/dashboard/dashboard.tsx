import { DashboardProps } from "./dashboard.props";
import React, { useState } from "react";
import './dashboard.css';
import { ApartmentList } from "../apartment-list/apartment-list";
import { Apartment, ApartmentSearchParams } from "../../models";
import { IntegrationServices } from "../../services/api/integrations/integration-services";

const APARTMENT_SEARCH_PARAMS = new ApartmentSearchParams(
    50 * 1000,
    100 * 1000,
);

/**
 * Dashboard
 */
export const Dashboard = function DashboardComponent(props: DashboardProps) {
    const [ getApartments, setApartments ] = useState<Apartment[]>([])

    const onSearch = () => {
        IntegrationServices.cityExpert.findApartments(APARTMENT_SEARCH_PARAMS)
            .then(apartments => {
                setApartments(apartments)
            })
    }

    return <div className={"dashboard"}>
        <button className={"searchButton"} onClick={onSearch}/>
        <ApartmentList apartments={getApartments}/>
    </div>
}

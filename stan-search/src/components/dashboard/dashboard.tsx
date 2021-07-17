import { DashboardProps } from "./dashboard.props";
import React, { useState } from "react";
import './dashboard.css';
import { ApartmentList } from "../apartment-list/apartment-list";
import { Apartment, ApartmentSearchParams } from "../../models";
import { IntegrationManager } from "../../services/api/integrations/integration-manager";
import { Button } from "@material-ui/core";

const APARTMENT_SEARCH_PARAMS = new ApartmentSearchParams(
    75 * 1000,
    115 * 1000,
);

/**
 * Dashboard
 */
export const Dashboard = function DashboardComponent(props: DashboardProps) {
    const [ apartments, setApartments ] = useState<Apartment[]>([])

    const onSearch = () => {
        IntegrationManager.findApartments(APARTMENT_SEARCH_PARAMS)
            .then(apartments => {
                setApartments(apartments)
            })
    }

    return <div className={"dashboard"}>
        <Button variant="contained"
                color={"primary"}
                onClick={onSearch}>
            Search
        </Button>
        <div>Total apartments: {apartments.length}</div>
        <ApartmentList apartments={apartments}/>
    </div>
}

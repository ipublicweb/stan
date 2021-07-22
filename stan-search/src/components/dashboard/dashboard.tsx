import { DashboardProps } from "./dashboard.props";
import React, { useState } from "react";
import './dashboard.css';
import { ApartmentList } from "../apartment-list/apartment-list";
import { ApartmentSearchParams, LOCATION } from "../../models";
import { IntegrationManager } from "../../services/api/integrations/integration-manager";
import { Button } from "@material-ui/core";
import { ApartmentSearchResult } from "../../models/apartment-search-result";

const APARTMENT_SEARCH_PARAMS = new ApartmentSearchParams(
    75 * 1000,
    115 * 1000,
    70,
    true,
    true,
    [LOCATION.BULEVAR_OSLOBODJENJA, LOCATION.BANATIC, LOCATION.ROTKVARIJA, LOCATION.SAJMISTE, LOCATION.LIMAN]
);

/**
 * Dashboard
 */
export const Dashboard = function DashboardComponent(props: DashboardProps) {
    const [ apartmentsResult, setApartmentsResult ] = useState<ApartmentSearchResult>()

    const onSearch = () => {
        IntegrationManager.findApartments(APARTMENT_SEARCH_PARAMS)
            .then(result => {
                setApartmentsResult(result)
            })
    }

    return <div className={"dashboard"}>
        {apartmentsResult ?
            <div className={"search-info"}>
                <div>Search params: {JSON.stringify(APARTMENT_SEARCH_PARAMS)}</div>
                <div className={"search-integrations"}>
                    <div>CityExpert apartments: <span className={"search-counts"}>{apartmentsResult.cityExpertApartmentsCount}</span></div>
                    <div>4Zida apartments: <span className={"search-counts"}>{apartmentsResult.cetriZidaApartmentsCount}</span></div>
                </div>
            </div>
            : <Button variant="contained"
                      color={"primary"}
                      onClick={onSearch}>
                Search
            </Button>
        }
        {apartmentsResult ?
            <ApartmentList apartments={apartmentsResult.allApartments}/>
            : undefined
        }
    </div>
}

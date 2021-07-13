import { DashboardProps } from "./dashboard.props";
import React, { useEffect, useState } from "react";
import './dashboard.css';
import { ApartmentList } from "../apartment-list/apartment-list";
import { IntegrationServices } from "../../services/api/integrations/integration-services";
import { Apartment, ApartmentSearchParams } from "../../models";

const APARTMENT_SEARCH_PARAMS: ApartmentSearchParams = {
    priceFrom: 80 * 1000,
    sizeFrom: 75,
}

/**
 * Dashboard
 */
export const Dashboard = function DashboardComponent(props: DashboardProps) {
    const [ getApartments, setApartments ] = useState<Apartment[]>([])

    useEffect(() => {
        let mounted = true;
        IntegrationServices.cityExpert
            .findApartments(APARTMENT_SEARCH_PARAMS).then(apartments => {
            if (mounted) {
                setApartments(apartments)
            }
        })
        return () => {
            mounted = false
        };
    }, [])

    return <div className={"dashboard"}>
        <ApartmentList apartments={getApartments}/>
    </div>
}

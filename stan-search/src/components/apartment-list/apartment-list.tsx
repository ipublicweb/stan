import { ApartmentListProps } from "./apartment-list.props";
import React from "react";
import './apartment-list.css';
import { Apartment } from "../apartment/apartment";

/**
 * Apartment list
 */
export const ApartmentList = function DashboardComponent(props: ApartmentListProps) {
    const { apartments } = props

    return <div className={"apartments"}>
        {apartments.map(apartment => {
            return <Apartment key={apartment.id} apartment={apartment}/>
        })}
    </div>
}

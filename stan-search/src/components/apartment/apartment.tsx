import { ApartmentProps } from "./apartment.props";
import React from "react";
import './apartment.css';

/**
 * Apartment
 */
export const Apartment = function DashboardComponent(props: ApartmentProps) {
    const { apartment } = props

    return <div className={"apartment"}>
        <div className={"name"}>{apartment.name}</div>
        <div className={"size"}>{apartment.size}</div>
    </div>
}

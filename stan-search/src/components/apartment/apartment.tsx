import { ApartmentProps } from "./apartment.props";
import React from "react";
import './apartment.css';
import { AgencyLinks } from "../agency-links/agency-links";
import { Score } from "../score/score";
import { Price } from "../price/price";

/**
 * PriceProps
 */
export const Apartment = function ApartmentComponent(props: ApartmentProps) {
    const { apartment } = props

    return <div className={"apartment"}>
        <Price apartment={apartment}/>
        <div className={"details"}>
            <div className={"row"}>
                <div className={"street"}>{apartment.street}</div>
            </div>
            <div className={"row"}>
                <div className={"structure"}>structure: {apartment.structure}</div>
                <div className={"spacer"}/>
                <div className={"floors"}><span className={"floor"}>floor: {apartment.floor}</span>/{apartment.floorsInBuilding}</div>
            </div>
            <div className={"row"}>
                <div className={"polygons"}>{apartment.polygons.toString()}</div>
            </div>
            <div className={"row"}>
                <AgencyLinks agencyLinks={apartment.agencyLinks}/>
                <div className={"create-date"}>created: {apartment.creationDate}</div>
            </div>
        </div>
        <Score apartment={apartment}/>
    </div>
}

import { PriceProps } from "./price.props";
import React from "react";
import './price.css';
import { NOT_AVAILABLE } from "../../utils/general-utils";

/**
 * Price component
 */
export const Price = function PriceComponent(props: PriceProps) {
    const { apartment } = props

    const price = apartment.price ? apartment.price.toLocaleString() : NOT_AVAILABLE;
    const pricePerSize = apartment.pricePerSize ? apartment.pricePerSize.toLocaleString() : NOT_AVAILABLE;

    return <div className={"price-container"}>
        <div className={"price"}>{price}</div>
        <div className={"price-per-size"}>{pricePerSize}</div>
        <div className={"size"}>{apartment.size}m2</div>
    </div>
}

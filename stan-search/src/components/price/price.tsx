import { PriceProps } from "./price.props";
import React from "react";
import './price.css';

/**
 * Price component
 */
export const Price = function PriceComponent(props: PriceProps) {
    const { apartment } = props

    return <div className={"priceContainer"}>
        <div className={"price"}>{apartment.price.toLocaleString()}</div>
        <div className={"pricePerSize"}>{apartment.pricePerSize.toLocaleString()}</div>
        <div className={"size"}>{apartment.size}m2</div>
    </div>
}

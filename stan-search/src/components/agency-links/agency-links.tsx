import { AgencyLinksProps } from "./agency-links.props";
import React from "react";
import './agency-links.css';
import CityExpert from "../../assets/svg/cityexpert.svg";
import CetriZida from "../../assets/svg/cetriZida.png";
import NoAgency from "../../assets/svg/noAgency.svg";
import { Integrations } from "../../models/enumerations/Integrations";
import { AgencyLink } from "../../models/agency-link";

/**
 * Agency links component
 */
export const AgencyLinks = function AgencyLinksComponent(props: AgencyLinksProps) {
    const { agencyLinks } = props

    return <div className={"links"}>
        {agencyLinks.map(link => {
            return <div className={"link"} key={link.id}>
                {link.available ?
                    <div className={"link-available"}>
                        {createLink(link)}
                    </div>
                    : <div className={"link-unavailable"}>
                        {createLink(link)}
                    </div>
                }
                <div className={"spacer"}/>
            </div>
        })}
    </div>
}

const createLink = (link: AgencyLink) => {
    const logoImage = getLogoImage(link.integration);

    return <a href={link.link} target="_blank" rel="noreferrer">
        <div className={"link-image"}>
            <img src={logoImage} alt="Agency link"/>
        </div>
    </a>
}

const getLogoImage = (integration: Integrations) => {
    switch (integration) {
        case Integrations.CITY_EXPERT:
            return CityExpert;
        case Integrations.CETRI_ZIDA:
            return CetriZida;
        default:
            return NoAgency;
    }
}

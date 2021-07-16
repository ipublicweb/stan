import { ScoreProps } from "./score.props";
import React from "react";
import './score.css';
import GoldStar from "../../assets/svg/goldStar.svg";
import SilverStar from "../../assets/svg/silverStar.svg";
import { MatchedPredictors } from "../../models/enumerations/MatchedPredictors";

/**
 * Price component
 */
export const Score = function ScoreComponent(props: ScoreProps) {
    const { apartment } = props
    const matchedPredictorsImage = getMatchedPredictorsImage(apartment.matchedPredictors);

    return <div className={"score"}>
        {matchedPredictorsImage ? <img src={matchedPredictorsImage} alt="Matched score"/> : undefined}
        <div>{apartment.score}</div>
    </div>
}

function getMatchedPredictorsImage(patchedPredictors: MatchedPredictors) {
    switch (patchedPredictors) {
        case MatchedPredictors.FLOOR_TOTALPRICE_PRICEPERSIZE:
            return GoldStar;
        case MatchedPredictors.FLOOR_PRICEPERSIZE:
        case MatchedPredictors.FLOOR_TOTALPRICE:
        case MatchedPredictors.TOTALPRICE_PRICEPERSIZE:
            return SilverStar;
        default:
            return SilverStar;
    }
}

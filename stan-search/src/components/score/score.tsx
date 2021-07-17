import { ScoreProps } from "./score.props";
import React from "react";
import './score.css';
import GoldStar from "../../assets/svg/goldStar.svg";
import SilverStar from "../../assets/svg/silverStar.svg";

/**
 * Price component
 */
export const Score = function ScoreComponent(props: ScoreProps) {
    const { apartment } = props
    const starImage = getImageByScore(apartment.score);

    return <div className={"score"}>
        {starImage ? <img src={starImage} alt="Star"/> : undefined}
        <div>{apartment.score}</div>
    </div>
}

function getImageByScore(score: string) {
    const scoreValue = Number.parseFloat(score);
    if (scoreValue > 0.7) {
        return GoldStar;
    }
    if (scoreValue > 0.55) {
        return SilverStar;
    }
    return undefined
}

// function getImageByMatchedPredictors(patchedPredictors: MatchedPredictors) {
//     switch (patchedPredictors) {
//         case MatchedPredictors.FLOOR_TOTALPRICE_PRICEPERSIZE:
//             return GoldStar;
//         case MatchedPredictors.FLOOR_PRICEPERSIZE:
//         case MatchedPredictors.FLOOR_TOTALPRICE:
//         case MatchedPredictors.TOTALPRICE_PRICEPERSIZE:
//             return SilverStar;
//         default:
//             return SilverStar;
//     }
// }

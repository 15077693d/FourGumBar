import React from 'react';
import { blue, grey, bold, small_margin_bottom, medium_margin_bottom } from '../styles/common.module.css';
import { card_container, card_description } from '../styles/components/card.module.css';
import EthBar from './ethBar';
const Card = ({ campaign,setSelectedCampaign }) => {
    const { category, description, title, recentETH, target, address } = campaign
    const handleClick = () => {
        setSelectedCampaign(campaign)
        window.history.replaceState(null, null, `/campaign/${address}`);
    }
    return (
        <div className={card_container} onClick={handleClick}>
                    <h1 className={`${blue} ${medium_margin_bottom}`}>{category}</h1>
                    <div className={`${bold} ${small_margin_bottom}`}>{title}</div>
                    <div className={`${grey} ${card_description} ${small_margin_bottom}`}>{description}</div>
                    <EthBar recentETH={recentETH} target={target} />
        </div>
    );
};


export default Card;
import React from 'react';
import { blue, grey, bold, space_between, small_margin_bottom, medium_margin_bottom } from '../styles/common.module.css';
import { card_container, card_description } from '../styles/components/card.module.css';
import ProgressBar from '@ramonak/react-progress-bar';
const Card = ({ category, title, description, target, recentETH }) => {
    const percent = `${String(recentETH * 100 / target).substr(0, 3)}%`
    const progress = `${Math.ceil(recentETH)}/${Math.ceil(target)} ETH`
    return (
        <div className={card_container}>
            <h1 className={`${blue} ${medium_margin_bottom}`}>{category}</h1>
            <div className={`${bold} ${small_margin_bottom}`}>{title}</div>
            <div className={`${grey} ${card_description} ${small_margin_bottom}`}>{description}</div>
            <div className={`${bold} ${space_between}`}>
                <span className={blue}>{percent}</span>
                <span>{progress}</span>
            </div>
            <ProgressBar completed={recentETH * 100 / target} labelSize="0px" bgcolor="#452ba0" />
        </div>
    );
};

export default Card;
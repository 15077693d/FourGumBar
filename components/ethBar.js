import React from 'react';
import { space_between, bold, blue } from '../styles/common.module.css'
import ProgressBar from '@ramonak/react-progress-bar';
const EthBar = ({ numerator, denominator, className }) => {
    const percent = `${(Number(numerator) * 100 / Number(denominator)).toFixed(1)}%`
    const progress = `${Number(numerator).toFixed(1)}/${Number(denominator).toFixed(1)} ETH`
    return (
        <div className={className}>
            <div className={`${bold} ${space_between}`}>
                <span className={blue}>{percent}</span>
                <span>{progress}</span>
            </div>
            <ProgressBar completed={numerator * 100 / denominator} labelSize="0px" bgcolor="#452ba0" />
        </div>
    );
};

export default EthBar;
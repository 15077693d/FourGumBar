import React from 'react';
import { space_between, bold, blue } from '../styles/common.module.css'
import ProgressBar from '@ramonak/react-progress-bar';
const EthBar = ({ recentETH, target, className }) => {
    const percent = `${(Number(recentETH) * 100 / Number(target)).toFixed(1)}%`
    const progress = `${Number(recentETH).toFixed(1)}/${Number(target).toFixed(1)} ETH`
    return (
        <div className={className}>
            <div className={`${bold} ${space_between}`}>
                <span className={blue}>{percent}</span>
                <span>{progress}</span>
            </div>
            <ProgressBar completed={recentETH * 100 / target} labelSize="0px" bgcolor="#452ba0" />
        </div>
    );
};

export default EthBar;
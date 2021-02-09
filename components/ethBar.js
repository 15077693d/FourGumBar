import React from 'react';
import { space_between, bold, blue } from '../styles/common.module.css'
import ProgressBar from '@ramonak/react-progress-bar';
const EthBar = ({ numerator, denominator, className,isVote }) => {
    const percent = Number(numerator) * 100 / Number(denominator)
    const percentStr = `${percent.toFixed(1)}%`
    const progress = isVote?`${Number(numerator).toFixed(0)}/${Number(denominator).toFixed(0)}`:`${Number(numerator).toFixed(1)}/${Number(denominator).toFixed(1)} ETH`
    let bgcolor = "#452ba0"
    if(isVote){
        bgcolor = percent>0.5?"#C5F8C9":"#F5B9B6";
    }
    return (
        <div className={className}>
            <div className={`${bold} ${space_between}`}>
                <span className={isVote?"none":blue}>{percentStr}</span>
                <span >{progress}</span>
            </div>
            <ProgressBar completed={numerator * 100 / denominator} labelSize="0px" bgcolor={bgcolor} />
        </div>
    );
};

export default EthBar;
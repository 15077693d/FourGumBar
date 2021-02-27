import React from 'react';
import { space_between, bold, blue } from '../styles/common.module.css'
import ProgressBar from '@ramonak/react-progress-bar';
const EthBar = ({ numerator, denominator, className,isVote,bgColor }) => {
    const percent = Number(numerator) * 100 / Number(denominator)
    const percentStr = Number(denominator)===0?`0%`:`${Number(percent)}%`
    const progress = isVote?`${Number(numerator)}/${Number(denominator)}`:`${Number(numerator)}/${Number(denominator)} ETH`
    let bgcolor = "#452ba0"
    if(isVote){
        bgcolor = percent>0.5?"#C5F8C9":"#F5B9B6";
    }
    if(bgColor){
        bgcolor = bgColor
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
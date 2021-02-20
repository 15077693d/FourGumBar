import React from 'react';
import {container,title,right} from '../../styles/components/budgetItem.module.css'


const BudgetItem = ({budget, handleClick}) => {
    const {item,eth,amount,total,complete} = budget
    let bgColor
    if(complete){
        bgColor = "#F2F4F5"
    }else{
        bgColor =  Number(amount)/Number(total) > 0.5?"#C5F8C9":"#F5B9B6"
    }
    return (
        <div onClick={handleClick} className={container}>
            <div className={title}>
                {item}
            </div>
            <div className={right} style={{backgroundColor: bgColor}}>
                <p className="eth">{eth} ETH</p>
                <p className="vote">{amount}/{total}</p>
            </div>
        </div>
    );
};

export default BudgetItem;
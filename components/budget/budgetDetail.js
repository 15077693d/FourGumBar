import React from 'react';
import EthBar from '../ethBar';
import { form_input, form_textarea } from '../../styles/components/createCampaignForm.module.css'
import { blue_big_btn, space_around } from '../../styles/common.module.css'
const BudgetDetail = ({ budget }) => {
    const { eth, address, description, amount, pass, total } = budget
    return (
        <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-around" }} >
            <EthBar denominator={total} numerator={amount} />
            <div className={`${form_input} ${space_around}`}>
                <span>金額</span>
                <span style={{ width: "40%", wordBreak: "break-all" }}>{eth} ETH</span>
            </div>
            <div className={`${form_input} ${space_around}`}>
                <span>地址</span>
                <span style={{ width: "40%", wordBreak: "break-all" }}>{address}</span>
            </div>

            <div className={`${form_textarea} ${space_around}`}>
                <span>描述</span>
                <span style={{ width: "40%", wordBreak: "break-all" }}>
                    {description}
                </span>
            </div>
            <button className={blue_big_btn}>通過</button>
        </div>
    );
};

export default BudgetDetail;
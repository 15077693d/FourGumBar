import React from 'react';
import { grey, space_between, bold, medium_margin_bottom, special_char, center } from '../../styles/common.module.css'
import { active_btn, btn, content } from '../../styles/components/campaignDetail.module.css'
import { useState } from 'react';
import Table from '../table';
import {contribution_table} from '../../styles/components/table.module.css'
const CampaignDetail = ({ campaign, contributions }) => {
    const { description, address, minETH, manager } = campaign
    const idContentPair = {
        a: description,
        b: <div style={{height:130}} className={center}>
            <div style={{width:"90%"}} className={special_char}>
            <a href={`https://rinkeby.etherscan.io/address/${address}`} target="_blank">{address}</a>
            </div>
        </div>,
        c: <div style={{height:130}} className={center}>
        <div style={{textAlign:"center",width:"90%"}} className={special_char}>
        {minETH} ETH</div>
        </div>
        ,
        d: <Table key={address} className={contribution_table} data={contributions} columns={['地址','金額ETH']}/>,
        e: <div  style={{height:130}} className={center}>
        <div style={{width:"90%"}} className={special_char}>
        <a href={`https://rinkeby.etherscan.io/address/${manager}`} target="_blank">{manager}</a>
        </div>
    </div>

    }
    const [active, setActive] = useState('a')
    function handleClick(event) {
        setActive(event.target.id)
    }
    return (
        <div>
            <div className={`${space_between} ${medium_margin_bottom}`}>
                {
                    [["a", "描述"], ["b", "地址"], ["c", "最少支付"], ["d", "金主們"], ["e", "管理人"]].map(
                        pair => {
                            let className = pair[0] === active ? `${btn} ${active_btn} ${bold}` : `${btn} ${grey} ${bold}`
                            return <span key={pair[0]} onClick={handleClick} id={pair[0]} className={className}>{pair[1]}</span>
                        }
                    )
                }
            </div>
            <div className={content}>
                {idContentPair[active]}
            </div>
        </div>
    );
};

export default CampaignDetail;
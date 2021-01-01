import React from 'react';
import Link from 'next/link';
import { layout, logo, add_btn, eth_price, usd_price, prices } from "../styles/components/layout.module.css";
import { space_between, medium_margin_bottom } from '../styles/common.module.css'
import CreateCampaignForm from '../components/createCampaignForm'
import { useState } from 'react'
const Layout = ({ children }) => {
    const [added, setAdded] = useState(false)
    function handleClickAdd(){
        setAdded(!added)
    }
    
    return (
        <div className={layout}>
            <div className={`${space_between} ${medium_margin_bottom}`}>
                <Link href="/">
                    <a className={logo}>
                        課金吧
                    </a>
                </Link>
                <button className={add_btn} onClick={handleClickAdd}>
                    +
                    </button>
            </div>
            <div className={prices}>
                <span className={eth_price}>10.00 ETH</span>
                <span className={usd_price}>/ 6000 USD</span>
            </div>
            <div style={{ display: added ? "none" : "block" }}>
                {children}
            </div>
            <div style={{ display: added ? "block" : "none" }}>
                <CreateCampaignForm  handleClickAdd={handleClickAdd} />
            </div>
        </div>
    );
};

export default Layout;
import React from 'react';
import '../styles/Header.css';
import infoIcon from '../assets/icon/info.png'

function Header() {
    return (
        <>
            <div className='header-container'>
                <div className='header-content'>
                    APP 1933
                </div>
                <div className='info-icon'>
                    <img src={infoIcon} width='70%' />
                </div>

            </div>
        </>
    )
}

export default Header
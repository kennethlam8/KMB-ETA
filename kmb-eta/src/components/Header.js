import React from 'react';
import '../styles/Header.css';
import infoIcon from '../assets/icon/info.png'
import { Link } from 'react-router-dom';

function Header() {
    return (
        <>
            <div className='header-container'>
                <div className='header-content'>
                    APP 1933
                </div>
                <div className='info-icon'>
                    <Link to={'/contact'} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <img src={infoIcon} width='70%' />
                    </Link>
                </div>

            </div>
        </>
    )
}

export default Header
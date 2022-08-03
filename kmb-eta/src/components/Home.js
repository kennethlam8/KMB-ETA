import React from 'react'
import '../styles/Home.css'
import Header from './Header';
import banner from '../assets/image/kmb-banner.jpg'


function Home() {
    return (
        <div className='bg-config'>
            <div className='layout-container'>
                <Header />
                <div className='banner'>
                    <img src={banner} width='100%' />
                </div>
                <div className='bus-list-container'>
                    <div className='bus-list'>
                        <div className='bus-number'>107</div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '0.1rem' }}>
                                往<span className='destination'>華貴</span>
                            </div>
                            <div style={{ fontSize: '0.95rem' }}>
                                明愛xxx國際賓館
                            </div>

                        </div>
                        <div className='waiting-time'>
                            <div className='waiting-time-number'>15</div>
                            <div className='waiting-time-minute'>分鐘</div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Home
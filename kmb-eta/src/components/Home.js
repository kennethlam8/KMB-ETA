import { useState, useEffect } from 'react'
import '../styles/Home.css'
import Header from './Header';
import banner from '../assets/image/kmb-banner.jpg'
import { Link } from 'react-router-dom';


function Home() {

    const [tsuenKingRouteData, setTsuenKingRouteData] = useState()
    const [tsuenKingData, setTsuenKingData] = useState()


    useEffect(() => {
        getTsuenKingRouteData()
        // console.log('new date :', new Date)
        getTsuenKingData()
    }, [])

    const getTsuenKingRouteData = async (event) => {
        const res = await fetch("https://data.etabus.gov.hk/v1/transport/kmb/stop-eta/BFA3460955AC820C")
        const data = await res.json()
        const tkData = Object.values(data)[3]
        setTsuenKingRouteData(tkData)
        // console.log('fetch data : ', tkData)

    }

    const getTsuenKingData = async (event) => {
        const res = await fetch("https://data.etabus.gov.hk/v1/transport/kmb/stop/BFA3460955AC820C")
        const data = await res.json()
        const tkDataName = data.data.name_tc
        setTsuenKingData(tkDataName)
        console.log('fetch TsuenKingData : ', data.data)

    }

    return (
        <div className='bg-config'>
            <div className='layout-container'>
                <div className='header-banner-div'>
                    <Header />
                    <div className='banner'>
                        <img src={banner} width='100%' />
                    </div>
                </div>

                <div className='bus-list-container'>

                    {tsuenKingRouteData &&

                        tsuenKingRouteData.map((busInfo, index) => {
                            if (busInfo.eta_seq <= 2) {
                                return (
                                    <div key={index}>
                                        <Link to="/bus-detail" style={{ textDecoration: 'none', color: 'inherit' }}>
                                            <div className='bus-list'>
                                                <div className='bus-number'>{busInfo.route}</div>
                                                <div style={{ flex: 1 }}>
                                                    <div style={{ fontSize: '0.1rem' }}>
                                                        往<span className='destination'>{busInfo.dest_tc}</span>
                                                    </div>
                                                    <div style={{ fontSize: '0.95rem' }}>
                                                        {tsuenKingData}
                                                    </div>

                                                </div>
                                                <div className='waiting-time'>
                                                    <div className='waiting-time-number'>
                                                        15
                                                    </div>
                                                    <div className='waiting-time-minute'>分鐘</div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>

                                )
                            }

                        })

                    }




                </div>
            </div>
        </div>
    )
}

export default Home
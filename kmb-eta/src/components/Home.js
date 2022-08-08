import '../styles/Home.css'
import Header from './Header';
import banner from '../assets/image/kmb-banner.jpg'
import loadingIcon from '../assets/icon/loading.png'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapPin, faListUl } from '@fortawesome/free-solid-svg-icons'
import kmbIcon from '../assets/image/kmb-favicon.png'
import moment from 'moment';
import PullToRefresh from 'react-simple-pull-to-refresh';
import { Oval } from 'react-loading-icons'


const Home = () => {

    const [routeData, setRouteData] = useState()
    const [tsuenKingData, setTsuenKingData] = useState()
    const [chaiWanKokData, setChaiWanKokData] = useState()

    const [chaiWanKokRouteData, setChaiWanKokRouteData] = useState(false)
    const [dropdown, setDropdown] = useState(false)
    const [refresh, setRefresh] = useState(false)


    useEffect(() => {

        if (chaiWanKokRouteData) {
            getChaiWanKokRouteData()
            console.log('bbbbbbbbbbbbbbbbbbbb')
            return
        }

        getTsuenKingRouteData()
        getTsuenKingData()
        getChaiWanKokData()
        console.log('aaaaaaaaaaaaaaaaa')

    }, [chaiWanKokRouteData])


    const getTsuenKingRouteData = async () => {
        const res = await fetch("https://data.etabus.gov.hk/v1/transport/kmb/stop-eta/BFA3460955AC820C")
        const data = await res.json()
        const tkData = Object.values(data)[3]
        setRouteData(tkData)
        // console.log('fetch data : ', tkData)
    }

    const getTsuenKingData = async () => {
        const res = await fetch("https://data.etabus.gov.hk/v1/transport/kmb/stop/BFA3460955AC820C")
        const data = await res.json()
        const tkDataName = data.data.name_tc
        setTsuenKingData(tkDataName)
        console.log('fetch TsuenKingData : ', data.data)
    }

    const getChaiWanKokRouteData = async () => {
        const res = await fetch("https://data.etabus.gov.hk/v1/transport/kmb/stop-eta/5FB1FCAF80F3D97D")
        const data = await res.json()
        const cwkData = Object.values(data)[3]
        setRouteData(cwkData)
        // console.log('fetch data : ', cwkData)
    }

    const getChaiWanKokData = async () => {
        const res = await fetch("https://data.etabus.gov.hk/v1/transport/kmb/stop/5FB1FCAF80F3D97D")
        const data = await res.json()
        const cwkDataName = data.data.name_tc
        setChaiWanKokData(cwkDataName)
        // console.log('fetch TsuenKingData : ', data.data)
    }


    const LoadingImage = () => {
        return (
            <div className='loading-image-container'>
                <img src={loadingIcon} alt="loading" className='loading-image' />
            </div>
        )
    }

    const busEtaFormat = (busEta) => {
        if (moment(busEta).fromNow() === 'Invalid date') {
            return (
                <div className='caution-container'>
                    <span className='caution'>!</span>
                </div>
            )
        } else if (moment(busEta).fromNow().includes('ago') || moment(busEta).fromNow().includes('few') || moment(busEta).fromNow().includes('a')) {
            return (
                <div className='waiting-time-container'>
                    <div className='waiting-time-number'>-</div>
                    <div className='waiting-time-minute'>分鐘</div>
                </div>
            )
        }
        return (
            <div className='waiting-time-container'>
                <div className='waiting-time-number'>{moment(busEta).fromNow().substring(3, 5)}</div>
                <div className='waiting-time-minute'>分鐘</div>
            </div>
        )
    }

    const handlePullDownRefresh = () => {
        return new Promise(res => {
            setTimeout(() => {
                res(chaiWanKokRouteData ? getChaiWanKokRouteData() : getTsuenKingRouteData())
            }, 1000)
            setRefresh(true)
            setTimeout(() => {
                setRefresh(false)
            }, 1000)
        })
    }


    return (
        <div>
            <div className='layout-container'>
                <div className='header-banner-div'>
                    <div className='header-container'>
                        <Header />
                    </div>
                    <div className='banner'>
                        <a href='https://www.kmb.hk/tc/news/publications_corps.html' >
                            <img src={banner} alt={'KMB banner'} width='100%' />
                        </a>
                    </div>

                    <div className='current-location-container'>
                        <div className='current-location'>
                            <FontAwesomeIcon icon={faMapPin} className='current-location-icon' />
                            {chaiWanKokRouteData ? chaiWanKokData : tsuenKingData}

                        </div>
                        <div>
                            {dropdown
                                ? <FontAwesomeIcon icon={faListUl} className='select-location-icon-active' onClick={() => setDropdown(!dropdown)} />
                                : <FontAwesomeIcon icon={faListUl} className='select-location-icon' onClick={() => setDropdown(!dropdown)} />
                            }

                            {dropdown &&
                                <div className='dropdown-backdrop' onClick={() => setDropdown(false)}>
                                    <div className='dropdown-container'>
                                        <div className='dropdown-info' onClick={() => setChaiWanKokRouteData(false)}>
                                            <div>
                                                {tsuenKingData}
                                            </div>
                                        </div>
                                        <div className='dropdown-info' onClick={() => setChaiWanKokRouteData(true)}>
                                            <div>
                                                {chaiWanKokData}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            }
                        </div>
                    </div>
                </div>


                <div className='pulldown-msg-container'>
                    {refresh
                        ? <div className='pulldown-msg'>更新中...</div>
                        : <div className='pulldown-msg'>下拉以更新</div>
                    }


                </div>

                <div className='bus-list-container'>
                    <PullToRefresh onRefresh={handlePullDownRefresh} refreshingContent={<Oval stroke={"#ED1F28"} height={"30px"} />} >

                        {routeData ?

                            routeData.map((busInfo, index) => {

                                if (busInfo.eta_seq <= 2) {
                                    return (
                                        <div key={index}>
                                            {chaiWanKokRouteData
                                                ? <Link to={`/cwk-bus-detail/${index}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                                    <div className='bus-list'>
                                                        <div className='bus-number'>{busInfo.route}</div>
                                                        <div style={{ flex: 1 }}>
                                                            <div style={{ fontSize: '0.1rem' }}>
                                                                往<span className='destination'>{busInfo.dest_tc}</span>
                                                            </div>
                                                            <div style={{ fontSize: '0.95rem' }}>
                                                                {chaiWanKokData}
                                                            </div>

                                                        </div>
                                                        <div className='waiting-time'>
                                                            {/* <div className='waiting-time-number'>
                                        {moment(busInfo.eta).fromNow() === 'Invalid date'
                                            // || moment(busInfo.eta).fromNow() == 'a few seconds ago'
                                            // || moment(busInfo.eta).fromNow() == 'a minute ago'
                                            // || moment(busInfo.eta).fromNow() == 'in a few seconds'
                                            // || moment(busInfo.eta).fromNow() == 'in a few minutes'
                                            || moment(busInfo.eta).fromNow().includes('ago')
                                            || moment(busInfo.eta).fromNow().includes('few')
                                            || moment(busInfo.eta).fromNow().includes('a')
                                            ? '-'
                                            : moment(busInfo.eta).fromNow().substring(3, 5)
                                        }
                                    </div>
                                    <div className='waiting-time-minute'>分鐘</div> */}
                                                            {busEtaFormat(busInfo.eta)}
                                                        </div>
                                                    </div>
                                                </Link>

                                                : <Link to={`/bus-detail/${index}`} style={{ textDecoration: 'none', color: 'inherit' }}>
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
                                                            {/* {moment(busInfo.eta).fromNow() === 'Invalid date'
                                            // || moment(busInfo.eta).fromNow() == 'a few seconds ago'
                                            // || moment(busInfo.eta).fromNow() == 'a minute ago'
                                            // || moment(busInfo.eta).fromNow() == 'in a few seconds'
                                            // || moment(busInfo.eta).fromNow() == 'in a few minutes'
                                            || moment(busInfo.eta).fromNow().includes('ago')
                                            || moment(busInfo.eta).fromNow().includes('few')
                                            || moment(busInfo.eta).fromNow().includes('a')
                                            ? '-'
                                            : moment(busInfo.eta).fromNow().substring(3, 5)
                                        } */}

                                                            {busEtaFormat(busInfo.eta)}

                                                            {/* <div className='waiting-time-minute'>分鐘</div> */}
                                                        </div>
                                                    </div>
                                                </Link>
                                            }

                                        </div>

                                    )
                                }

                            })
                            :
                            <LoadingImage />
                        }

                    </PullToRefresh>
                </div>

            </div>
        </div>
    )
}

export default Home
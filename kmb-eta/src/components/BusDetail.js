import '../styles/BusDetail.css'
import Map from './Map'
import moment from 'moment';
import loadingIcon from '../assets/icon/loading.png'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { useParams, useNavigate } from 'react-router-dom'
import { useLoadScript } from "@react-google-maps/api";


const BusDetail = () => {
    const { isLoaded } = useLoadScript({ googleMapsApiKey: `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}` || "", });
    const navigate = useNavigate();
    let params = useParams()

    const [tsuenKingEta, setTsuenKingEta] = useState()
    const [tsuenKingRouteDetailById, setTsuenKingRouteDetailById] = useState()
    const [tsuenKingData, setTsuenKingData] = useState()
    const [isRouteShow, setIsRouteShow] = useState(false)
    const [isShowAllStops, setIsShowAllStops] = useState(false)

    useEffect(() => {
        getTsuenKingRouteData()
        getTsuenKingData()
    }, [])


    useEffect(() => {
        getTsuenKingEta()
    }, [tsuenKingRouteDetailById])


    const getTsuenKingRouteData = async () => {
        try {
            const res = await fetch("https://data.etabus.gov.hk/v1/transport/kmb/stop-eta/BFA3460955AC820C")
            const data = await res.json()
            const tkData = Object.values(data)[3]
            const tkRouteDataById = tkData[params.id]
            setTsuenKingRouteDetailById(tkRouteDataById)
        } catch (error) {
            console.log(error)
        }
    }

    const getTsuenKingData = async () => {
        try {
            const res = await fetch("https://data.etabus.gov.hk/v1/transport/kmb/stop/BFA3460955AC820C")
            const data = await res.json()
            const tkDataName = data.data
            setTsuenKingData(tkDataName)
        } catch (error) {
            console.log(error)
        }
    }

    const getTsuenKingEta = async () => {
        try {
            const res = await fetch(`https://data.etabus.gov.hk/v1/transport/kmb/eta/BFA3460955AC820C/${tsuenKingRouteDetailById.route}/${tsuenKingRouteDetailById.service_type}`)
            const data = await res.json()
            const tkData = Object.values(data)[3]
            setTsuenKingEta(tkData)
        } catch (error) {
            console.log(error)
        }
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
                </div>
            )
        }
        return (
            <div className='waiting-time-container'>
                <div className='waiting-time-number'>{moment(busEta).fromNow().substring(3, 5)}</div>
            </div>
        )
    }

    if (!isLoaded) {
        return (
            <div className='loading-image-container'>
                <img src={loadingIcon} alt="loading" className='loading-image' />
            </div>
        )
    }

    return (
        <div >
            <div>
                {tsuenKingRouteDetailById && tsuenKingData && tsuenKingEta &&
                    <div>
                        <div className='detail-header-container'>
                            <div className='detail-header-content'>
                                {tsuenKingRouteDetailById.route} 往 {tsuenKingRouteDetailById.dest_tc}
                            </div>
                        </div>
                        <FontAwesomeIcon icon={faAngleLeft} className='previous-icon' onClick={() => navigate(-1)} />
                        <div>
                            <div className='map-container'>
                                <Map
                                    isCwkMarker={false}
                                    tkLatLng={{ lat: Number(tsuenKingData.lat), lng: Number(tsuenKingData.long) }}
                                    stopId={tsuenKingData.stop}
                                    route={tsuenKingRouteDetailById.route}
                                    direction={tsuenKingRouteDetailById.dir}
                                    service={tsuenKingRouteDetailById.service_type}
                                    busStopName={tsuenKingData.name_tc}
                                    isRouteShow={isRouteShow}
                                    isShowAllStops={isShowAllStops}
                                />
                            </div>
                            <div className='detail-button-container'>
                                <div className='detail-button-box'>
                                    {!isRouteShow
                                        ? <div className='detail-button' onClick={() => setIsRouteShow(true)}>
                                            顯示路線
                                        </div>
                                        : <div className='detail-button' onClick={() => setIsRouteShow(false)}>
                                            隱藏路線
                                        </div>
                                    }
                                    {!isShowAllStops
                                        ? <div className='detail-button' onClick={() => setIsShowAllStops(true)}>
                                            觀看全部
                                        </div>
                                        : <div className='detail-button' onClick={() => setIsShowAllStops(false)}>
                                            目前位置
                                        </div>
                                    }
                                </div>
                            </div>
                            <div>
                                <div className='location'>{tsuenKingData.name_tc}</div>
                                {tsuenKingEta.map((routeData, index) => {
                                    if (routeData.route === tsuenKingRouteDetailById.route) {
                                        return (
                                            <div key={index} className="eta-container">
                                                <div className='eta-time-container'>
                                                    <div className="eta-time">
                                                        {busEtaFormat(routeData.eta)}
                                                    </div>
                                                </div>
                                                <div className='eta-min'>分鐘<span className='eta-rmk'>{routeData.rmk_tc}</span></div>
                                            </div>
                                        )
                                    }
                                })}
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default BusDetail
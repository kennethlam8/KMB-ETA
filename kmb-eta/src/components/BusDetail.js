import { useState, useEffect } from 'react'
import '../styles/BusDetail.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { useParams, useNavigate } from 'react-router-dom'
import Map from './Map'
import moment from 'moment';


const BusDetail = () => {

    const navigate = useNavigate();
    let params = useParams()
    const [tsuenKingEta, setTsuenKingEta] = useState()
    const [tsuenKingRouteDetailById, setTsuenKingRouteDetailById] = useState()
    const [tsuenKingData, setTsuenKingData] = useState()


    useEffect(() => {
        getTsuenKingRouteData()
        getTsuenKingData()
    }, [])


    useEffect(() => {
        getTsuenKingEta()
    }, [tsuenKingRouteDetailById])


    const getTsuenKingRouteData = async () => {
        const res = await fetch("https://data.etabus.gov.hk/v1/transport/kmb/stop-eta/BFA3460955AC820C")
        const data = await res.json()
        const tkData = Object.values(data)[3]
        const tkRouteDataById = tkData[params.id]
        setTsuenKingRouteDetailById(tkRouteDataById)
        console.log('fetch tkEtaData params.id : ', tkRouteDataById)
    }

    const getTsuenKingData = async () => {
        const res = await fetch("https://data.etabus.gov.hk/v1/transport/kmb/stop/BFA3460955AC820C")
        const data = await res.json()
        const tkDataName = data.data
        setTsuenKingData(tkDataName)
        console.log('fetch TsuenKingData : ', tkDataName)
    }

    const getTsuenKingEta = async () => {
        const res = await fetch(`https://data.etabus.gov.hk/v1/transport/kmb/eta/BFA3460955AC820C/${tsuenKingRouteDetailById.route}/${tsuenKingRouteDetailById.service_type}`)
        const data = await res.json()
        const tkData = Object.values(data)[3]
        setTsuenKingEta(tkData)
        console.log('fetch tkEtaData (ETA) : ', tkData)
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
                                <Map isCwkMarker={false} tkLatLng={{ lat: Number(tsuenKingData.lat), lng: Number(tsuenKingData.long) }} />

                            </div>
                            <div>
                                <div className='location'>{tsuenKingData.name_tc}</div>
                                {tsuenKingEta.map((routeData, index) => {
                                    if (routeData.route === tsuenKingRouteDetailById.route) {
                                        return (
                                            <div key={index} className="eta-container">
                                                <div className='eta-time-container'>
                                                    <div className="eta-time">
                                                        {/* {moment(routeData.eta).fromNow() == 'Invalid date'
                                                            || moment(routeData.eta).fromNow().includes('ago')
                                                            || moment(routeData.eta).fromNow().includes('few')
                                                            || moment(routeData.eta).fromNow().includes('a')
                                                            ? '-'
                                                            : moment(routeData.eta).fromNow().substring(3, 5)
                                                        } */}
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
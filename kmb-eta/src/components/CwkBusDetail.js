import '../styles/CwkBusDetail.css'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { useParams, useNavigate } from 'react-router-dom'
import Map from './Map'
import moment from 'moment';
import { useLoadScript } from "@react-google-maps/api";
import loadingIcon from '../assets/icon/loading.png'


const CwkBusDetail = () => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}` || "",
    });

    const navigate = useNavigate();
    let params = useParams()

    const [chaiWanKokEta, setChaiWanKokEta] = useState()
    const [chaiWanKokRouteDetailById, setChaiWanKokRouteDetailById] = useState()
    const [chaiWanKokData, setChaiWanKokData] = useState()

    useEffect(() => {
        getChaiWanKokRouteData()
        getChaiWanKokData()

    }, [])

    useEffect(() => {
        getChaiWanKokEta()
    }, [chaiWanKokRouteDetailById])


    const getChaiWanKokRouteData = async () => {
        try {
            const res = await fetch("https://data.etabus.gov.hk/v1/transport/kmb/stop-eta/5FB1FCAF80F3D97D")
            const data = await res.json()
            const cwkData = Object.values(data)[3]
            const tkRouteData = cwkData[params.id]
            setChaiWanKokRouteDetailById(tkRouteData)
        } catch (error) {
            console.log(error)
        }
    }


    const getChaiWanKokData = async () => {
        try {
            const res = await fetch("https://data.etabus.gov.hk/v1/transport/kmb/stop/5FB1FCAF80F3D97D")
            const data = await res.json()
            const cwkDataName = data.data
            setChaiWanKokData(cwkDataName)
        } catch (error) {
            console.log(error)
        }
    }


    const getChaiWanKokEta = async () => {
        try {
            const res = await fetch(`https://data.etabus.gov.hk/v1/transport/kmb/eta/5FB1FCAF80F3D97D/${chaiWanKokRouteDetailById.route}/${chaiWanKokRouteDetailById.service_type}`)
            const data = await res.json()
            const tkData = Object.values(data)[3]
            setChaiWanKokEta(tkData)
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
                {chaiWanKokRouteDetailById && chaiWanKokData && chaiWanKokEta &&
                    <div>
                        <div className='detail-header-container'>
                            <div className='detail-header-content'>
                                {chaiWanKokRouteDetailById.route} 往 {chaiWanKokRouteDetailById.dest_tc}
                            </div>

                        </div>
                        <FontAwesomeIcon icon={faAngleLeft} className='previous-icon' onClick={() => navigate(-1)} />
                        <div>
                            <div className='map-container'>
                                <Map
                                    isCwkMarker={true}
                                    cwkLatLng={{ lat: Number(chaiWanKokData.lat), lng: Number(chaiWanKokData.long) }}
                                    stopId={chaiWanKokData.stop}
                                    route={chaiWanKokRouteDetailById.route}
                                    direction={chaiWanKokRouteDetailById.dir}
                                    service={chaiWanKokRouteDetailById.service_type}
                                    busStopName={chaiWanKokData.name_tc}
                                />
                            </div>
                            <div>
                                <div className='location'>{chaiWanKokData.name_tc}</div>
                                {chaiWanKokEta.map((routeData, index) => {
                                    if (routeData.route === chaiWanKokRouteDetailById.route) {
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

export default CwkBusDetail
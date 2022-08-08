import { useState, useEffect } from 'react'
import '../styles/CwkBusDetail.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { useParams, useNavigate } from 'react-router-dom'
import Map from './Map'
import moment from 'moment';


const CwkBusDetail = () => {
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
        const res = await fetch("https://data.etabus.gov.hk/v1/transport/kmb/stop-eta/5FB1FCAF80F3D97D")
        const data = await res.json()
        const cwkData = Object.values(data)[3]
        const tkRouteData = cwkData[params.id]
        setChaiWanKokRouteDetailById(tkRouteData)
        console.log('fetch data : ', tkRouteData)
    }


    const getChaiWanKokData = async () => {
        const res = await fetch("https://data.etabus.gov.hk/v1/transport/kmb/stop/5FB1FCAF80F3D97D")
        const data = await res.json()
        const cwkDataName = data.data
        setChaiWanKokData(cwkDataName)
        console.log('fetch TsuenKingData : ', data.data)
    }


    const getChaiWanKokEta = async () => {
        const res = await fetch(`https://data.etabus.gov.hk/v1/transport/kmb/eta/5FB1FCAF80F3D97D/${chaiWanKokRouteDetailById.route}/${chaiWanKokRouteDetailById.service_type}`)
        const data = await res.json()
        const tkData = Object.values(data)[3]
        setChaiWanKokEta(tkData)
        console.log('fetch tkEtaData (ETA) : ', tkData)
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
                                <Map isCwkMarker={true} cwkLatLng={{ lat: Number(chaiWanKokData.lat), lng: Number(chaiWanKokData.long) }} />

                            </div>
                            <div>
                                <div className='location'>{chaiWanKokData.name_tc}</div>
                                {chaiWanKokEta.map((routeData, index) => {
                                    if (routeData.route === chaiWanKokRouteDetailById.route) {
                                        return (
                                            <div key={index} className="eta-container">
                                                <div className='eta-time-container'>
                                                    <div className="eta-time">
                                                        {moment(routeData.eta).fromNow() == 'Invalid date'
                                                            || moment(routeData.eta).fromNow().includes('ago')
                                                            || moment(routeData.eta).fromNow().includes('few')
                                                            || moment(routeData.eta).fromNow().includes('a')
                                                            ? '-'
                                                            : moment(routeData.eta).fromNow().substring(3, 5)
                                                        }
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
import { useState, useEffect } from 'react'
import '../styles/CwkBusDetail.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { useParams, useNavigate } from 'react-router-dom'
import Map from './Map'

const CwkBusDetail = () => {
    const navigate = useNavigate();
    let params = useParams()
    const [chaiWanKokRouteDetail, setChaiWanKokRouteDetail] = useState()
    const [chaiWanKokData, setChaiWanKokData] = useState()


    console.log('params .id :', params.id)


    useEffect(() => {
        getChaiWanKokRouteData()
        getChaiWanKokData()
    }, [])


    const getChaiWanKokRouteData = async () => {
        const res = await fetch("https://data.etabus.gov.hk/v1/transport/kmb/stop-eta/5FB1FCAF80F3D97D")
        const data = await res.json()
        const cwkData = Object.values(data)[3]
        const tkRouteData = cwkData[params.id]
        setChaiWanKokRouteDetail(tkRouteData)
        console.log('fetch data : ', tkRouteData)
    }


    const getChaiWanKokData = async () => {
        const res = await fetch("https://data.etabus.gov.hk/v1/transport/kmb/stop/5FB1FCAF80F3D97D")
        const data = await res.json()
        const cwkDataName = data.data
        setChaiWanKokData(cwkDataName)
        console.log('fetch TsuenKingData : ', data.data)
    }




    return (
        <div className='bus-bg-config'>
            <div className='bus-layout-container'>
                {chaiWanKokRouteDetail && chaiWanKokData &&
                    <div>
                        <div className='detail-header-container'>
                            <div className='detail-header-content'>
                                {chaiWanKokRouteDetail.route} 往 {chaiWanKokRouteDetail.dest_tc}
                            </div>

                        </div>
                        <FontAwesomeIcon icon={faAngleLeft} className='previous-icon' onClick={() => navigate(-1)} />
                        <div>
                            <div className='map-container'>
                                <Map isCwkMarker={true} cwkLatLng={{ lat: Number(chaiWanKokData.lat), lng: Number(chaiWanKokData.long) }} />

                            </div>
                            <div className='location'>{chaiWanKokData.name_tc}</div>
                        </div>

                    </div>

                }

            </div>
        </div>
    )
}

export default CwkBusDetail
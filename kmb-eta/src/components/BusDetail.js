import { useState, useEffect } from 'react'
import '../styles/BusDetail.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { useParams, useNavigate } from 'react-router-dom'
import Map from './Map'

const BusDetail = () => {

    const navigate = useNavigate();
    let params = useParams()
    const [tsuenKingRouteDetail, setTsuenKingRouteDetail] = useState()
    const [tsuenKingData, setTsuenKingData] = useState()
    const [mapMarker, setMapMarker] = useState(false)

    console.log('TK Data :', tsuenKingData)

    // console.log('params .id :', params.id)


    useEffect(() => {
        getTsuenKingRouteData()
        getTsuenKingData()
    }, [])


    const getTsuenKingRouteData = async () => {
        const res = await fetch("https://data.etabus.gov.hk/v1/transport/kmb/stop-eta/BFA3460955AC820C")
        const data = await res.json()
        const tkData = Object.values(data)[3]
        const tkRouteData = tkData[params.id]
        setTsuenKingRouteDetail(tkRouteData)
        console.log('fetch tkRouteData : ', tkRouteData)

    }

    const getTsuenKingData = async () => {
        const res = await fetch("https://data.etabus.gov.hk/v1/transport/kmb/stop/BFA3460955AC820C")
        const data = await res.json()
        const tkDataName = data.data
        setTsuenKingData(tkDataName)
        console.log('fetch TsuenKingData : ', tkDataName)
    }



    return (
        <div className='bus-bg-config'>
            <div className='bus-layout-container'>
                {tsuenKingRouteDetail && tsuenKingData &&
                    <div>
                        <div className='detail-header-container'>
                            <div className='detail-header-content'>
                                {tsuenKingRouteDetail.route} 往 {tsuenKingRouteDetail.dest_tc}
                            </div>

                        </div>
                        <FontAwesomeIcon icon={faAngleLeft} className='previous-icon' onClick={() => navigate(-1)} />
                        <div>
                            <div className='map-container'>
                                <Map isCwkMarker={false} tkLatLng={{ lat: Number(tsuenKingData.lat), lng: Number(tsuenKingData.long) }} />

                            </div>
                            <div className='location'>{tsuenKingData.name_tc}</div>
                        </div>

                    </div>

                }

            </div>
        </div>
    )
}

export default BusDetail
import { useState, useEffect } from 'react'
import '../styles/BusDetail.css'
import Header from '../components/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { useParams, useNavigate } from 'react-router-dom'
import Map from './Map'

function BusDetail(props) {

    const navigate = useNavigate();
    let params = useParams()
    const [tsuenKingRouteDetail, setTsuenKingRouteDetail] = useState()

    console.log('params .id :', params.id)


    useEffect(() => {
        getTsuenKingRouteData()
        // getTsuenKingData()
    }, [])


    const getTsuenKingRouteData = async () => {
        const res = await fetch("https://data.etabus.gov.hk/v1/transport/kmb/stop-eta/BFA3460955AC820C")
        const data = await res.json()
        const tkData = Object.values(data)[3]
        const tkRouteData = tkData[params.id]
        setTsuenKingRouteDetail(tkRouteData)
        console.log('fetch tkRouteData : ', tkRouteData)

    }



    return (
        <div className='bus-bg-config'>
            <div className='bus-layout-container'>
                {tsuenKingRouteDetail &&
                    <div>
                        <div className='detail-header-container'>
                            <div className='detail-header-content'>
                                {tsuenKingRouteDetail.route} 往 {tsuenKingRouteDetail.dest_tc}
                            </div>

                        </div>
                        <FontAwesomeIcon icon={faAngleLeft} className='previous-icon' onClick={() => navigate(-1)} />
                        <div>
                            <div className='map-container'>
                                <Map />

                            </div>
                            <div className='location'>荃景圍天橋</div>
                        </div>

                    </div>

                }

            </div>
        </div>
    )
}

export default BusDetail
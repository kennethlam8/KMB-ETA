import React from 'react'
import '../styles/BusDetail.css'
import Header from '../components/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { useParams, useNavigate } from 'react-router-dom'
import Map from './Map'

function BusDetail() {

    const navigate = useNavigate();
    // let params = useParams

    // console.log('params : ', params)
    // console.log('props : ', props)


    return (
        <div className='bg-config'>
            <div className='layout-container'>
                <Header />
                <FontAwesomeIcon icon={faAngleLeft} className='previous-icon' onClick={() => navigate(-1)} />
                <div>
                    <div className='map-container'>
                        <Map />

                    </div>
                    <div className='location'>荃景圍天橋</div>
                </div>

            </div>
        </div>
    )
}

export default BusDetail
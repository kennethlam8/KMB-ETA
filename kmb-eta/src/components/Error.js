import React from 'react'
import '../styles/Error.css'
import kmbIcon from '../assets/image/kmb-favicon.png'

function Error() {
    return (
        <div>
            <div className='bg-config'>
                <div className='layout-container'>
                    <div className='error-msg'>
                        <div className='error-header'>
                            <p style={{ fontWeight: 'bold', color: '#fff' }}>Page Not Found</p>

                        </div>
                        <a href={'/'} className='redirect-btn'>
                            <a className="redirect-home">Back to home</a>
                        </a>
                        <img src={kmbIcon} alt='KMB Image' style={{ marginTop: '2rem' }} />
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Error
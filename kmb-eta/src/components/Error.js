import React from 'react'
import '../styles/Error.css'
import kmbIcon from '../assets/image/kmb-favicon.png'

function Error() {
    return (
        <div>
            <div >
                <div >
                    <div className='error-msg'>
                        <div className='error-header'>
                            <p style={{ fontWeight: 'bold', color: '#fff' }}>找不到頁面</p>

                        </div>
                        <a href={'/'} className='redirect-btn'>
                            <a className="redirect-home">返回主頁</a>
                        </a>
                        <a href={'/contact'} className='redirect-btn'>
                            <a className="redirect-home">聯絡我們</a>
                        </a>
                        <img src={kmbIcon} alt='KMB Image' style={{ marginTop: '2rem' }} />
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Error
import '../styles/Contact.css'
import userIcon from '../assets/icon/user.png'
import emailIcon from '../assets/icon/email.png'
import gitIcon from '../assets/icon/github.png'
import kmbIcon from '../assets/image/kmb-favicon.png'

function Contact() {
    return (
        <div>
            <div className='contact-header-container'>
                <div className='contact-header-info'>聯絡資料</div>
            </div>
            <div className='contact-info-container'>
                <div className='contact-info-box'>
                    <div className='contact-info-circle-container'>
                        <div className='contact-info-circle'>
                            <img src={kmbIcon} width='90%' style={{ marginRight: '10px' }} />
                        </div>
                    </div>
                    <div className='contact-info'>
                        <div>
                            <img src={userIcon} width='60%' />
                        </div>
                        <div className='contact-info-text'>Kenneth Lam</div>
                    </div>

                    <div className='contact-info'>
                        <div>
                            <img src={emailIcon} width='60%' />
                        </div>
                        <div className='contact-info-text'>kennethdev8@gmail.com</div>
                    </div>

                    <div className='contact-info'>
                        <div>
                            <img src={gitIcon} width='60%' />
                        </div>
                        <a href="https://github.com/kennethlam8" className='contact-info-text' style={{ textDecoration: 'none' }}>
                            https://github.com/kennethlam8
                        </a>
                    </div>
                </div>
                <div>
                    <a href={'/'} className='contact-redirect-btn'>
                        <a className="contact-redirect-home">返回主頁</a>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Contact
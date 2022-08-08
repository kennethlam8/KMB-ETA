import '../styles/Contact.css'
import userIcon from '../assets/icon/user.png'
// import userIcon from '../assets/icon/user.png'
// import userIcon from '../assets/icon/user.png'

function Contact() {
    return (
        <div>
            <div className='contact-header-container'>
                <div className='contact-header-info'>聯絡資料</div>
            </div>
            <div className='contact-info-container'>
                <div className='contact-info-box'>
                    <div>
                        <img />
                        <p>Kenneth Lam</p>
                    </div>

                    <div>
                        <img />
                        <p>kennethdev8@gamil.com</p>
                    </div>

                    <div>
                        <img />
                        <a href="https://github.com/kennethlam8" style={{ textDecoration: 'none', color: 'inherit' }}>
                            https://github.com/kennethlam8
                        </a>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Contact
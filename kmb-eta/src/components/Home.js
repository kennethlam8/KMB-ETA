import React from 'react'
import '../styles/Home.css'
import Header from './Header';


function Home() {
    return (
        <div className='bg-config'>
            <div className='layout-container'>
                <Header />
            </div>
        </div>
    )
}

export default Home
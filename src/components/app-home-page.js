import React from 'react';
import {Link} from 'react-router-dom';

function AppHomePage(){
    return(
        <>
            <div className='app-home-page'>
                <h1>Home</h1>
                <Link to='/'>
                    <button className='tologinbtn'>TO LOGIN</button>
                </Link>
            </div>
        </>
    )
}

export default AppHomePage ;
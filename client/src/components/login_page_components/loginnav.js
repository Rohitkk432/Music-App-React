import React from 'react';
import './loginnav.css';
import logo from '../../images/logo.png';

function LoginNav (){
    return (
        <>
            <div className="nav">
                <div><img className="logo-img" src={logo} alt="logo" /></div>
            </div>
        </>
    )
}

export default LoginNav ;
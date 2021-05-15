import React from 'react';
import './loginpage.css'
import LoginNav from './loginnav'
import LoginPageContainer from './loginpagecontainer'


function LoginPage(){
    return(
        <>
            <div className='login-page'>
                <LoginNav />
                <LoginPageContainer />
            </div>
        </>
    )
}

export default LoginPage ;
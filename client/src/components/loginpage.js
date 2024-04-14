import React from 'react';
import './loginpage.css'
import LoginNav from './login_page_components/loginnav'
import LoginPageContainer from './login_page_components/loginpagecontainer'


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
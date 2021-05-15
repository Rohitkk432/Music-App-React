import React from "react";
import LoginPoster from "./loginposter";
import GoogleLogin from './googlelogin'
import "./loginpagecontainer.css"


function LoginPageContainer(){
    return(
        <>
            <div className="login-page-container">
                <LoginPoster/>
                <GoogleLogin />
            </div>
        </>
    )
}
export default LoginPageContainer ;
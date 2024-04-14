import React from "react";
import LoginPoster from "./loginposter";
import Login from './googlelogin';
import "./loginpagecontainer.css";


function LoginPageContainer(){
    return(
        <>
            <div className="login-page-container">
                <LoginPoster/>
                <Login />
            </div>
        </>
    )
}
export default LoginPageContainer ;
import React from 'react';
import './googlelogin.css';
import { GoogleLogin } from 'react-google-login';
import {useHistory} from 'react-router-dom';

// var currentUser;
function Login () {
        let history = useHistory();
        const onSuccess = (res)=>{
            const currentUser = res.profileObj.email;
            console.log(currentUser);
            history.push('/home');
        }
        const onFailure =(res)=>{
            console.log(res);
        }

        return(
            <div className="login-side">
                    <div className="apptext">
                        <div className="app-name">Music Pro X</div>
                        <div className="makers-org">A DevSoc Project</div>
                    </div>
                    <div className="logintext">
                        <div className="bitsdisclaimer">
                            <div className="bits-disclaimer">Sign in using</div>
                            <div className="bits-disclaimer">BITS mail</div>
                        </div>
                        <GoogleLogin
                            clientId="132873793273-jga64pb0l5nd25g2kjsr8rqm10tpt9pe.apps.googleusercontent.com"
                            buttonText="Login with Google"
                            prompt="select_account"
                            uxMode="popup"
                            redirectUri="https://musicprox.netlify.app/home"
                            onSuccess={onSuccess}
                            onFailure={onFailure}
                            cookiePolicy={'single_host_origin'}
                        />                
                    </div>
                </div>
        )    
}

export default Login ;
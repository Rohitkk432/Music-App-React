import React from 'react';
import './googlelogin.css';
import { GoogleLogin } from 'react-google-login';
import {useNavigate} from 'react-router-dom';
import { registerNewUser } from '../../methods';


function Login () {

    let currentUser;

    let navigate = useNavigate();
    const onSuccess = async (res)=>{
        currentUser = await res.profileObj.email;
        localStorage.setItem('email', currentUser);
        await checkOfUser();
        navigate('/home');
    }
    const onFailure =(res)=>{
        console.log(res);
    }
    
    function checkOfUser(){
        fetch(`https://music-pro-x-server.herokuapp.com/users/${currentUser}`,{ method: "GET"})
        .then((resp)=>resp.json())
        .then((res)=>{
            if(res){
                localStorage.setItem('id',res.id);
            }else{
                registerNewUser(currentUser).then((resp)=>{
                    localStorage.setItem('id',resp.id);
                });
            }
        }).catch((err)=>{
            if(err.message==="Unexpected end of JSON input"){
                registerNewUser(currentUser).then((resp)=>{
                    localStorage.setItem('id',resp.id);
                });
            }
        })
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
                    isSignedIn={true}
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    cookiePolicy={'single_host_origin'}
                />                
            </div>
        </div>
    )    
}
export default Login;
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
        fetch(`https://musicprox-server.onrender.com/users/${currentUser}`,{ method: "GET"})
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
                <GoogleLogin
                    clientId="132873793273-q8edlh1spu7cmf4pr5vp64ponkfoguhv.apps.googleusercontent.com"
                    buttonText="Login with Google"
                    prompt="select_account"
                    uxMode="popup"
                    redirectUri="https://music-pro-x.vercel.app/home"
                    isSignedIn={true}
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    cookiePolicy={'single_host_origin'}
                    className="google-login"
                />                
            </div>
        </div>
    )    
}
export default Login;

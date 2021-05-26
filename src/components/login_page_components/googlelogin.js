import React from 'react';
import './googlelogin.css';
import { GoogleLogin } from 'react-google-login';
import {useHistory} from 'react-router-dom';

var currentUser;
var currentId;
function Login () {
        let history = useHistory();
        const onSuccess = (res)=>{
            currentUser = res.profileObj.email;
            checkOfUser();
            // console.log(currentUser);
            history.push('/home');
        }
        const onFailure =(res)=>{
            console.log(res);
        }
        
        // 
        async function checkOfUser(){
            await fetch(`https://music-pro-x-server.herokuapp.com/users/${currentUser}`,{ method: "GET"})
            .then((resp)=>resp.json())
            .then((res)=>{
                if(res){
                    currentId=res.id;
                }else{
                    fetch('https://music-pro-x-server.herokuapp.com/users',{
                        method:"POST",
                        headers:{"Content-Type": "application/json"},
                        body: JSON.stringify({"email":`${currentUser}`})
                    })
                    .then((res)=>res.json())
                    .then((user)=>{
                        currentId=user.id
                    })
                    .catch((err)=>console.log(err));
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
export {currentUser,currentId};
export default Login;
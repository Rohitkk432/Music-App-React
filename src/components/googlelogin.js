import React from 'react';
import './googlelogin.css';

function GoogleLogin(){
    return(
        <>  
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
                    <div className="g-signin2" data-width="220" data-height="60" data-onsuccess="onSignIn"></div>
                    <button className="logoutbutton" onclick="signOut();">Sign out</button>
                </div>
            </div>
        </>
    )
}

export default GoogleLogin ;
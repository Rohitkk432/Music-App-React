/* global gapi */
import React from 'react';
import './googlelogin.css';
import {Link} from 'react-router-dom';

function GoogleLogin(){
    // let email;

    // function onSignIn(googleUser) {
    //     var profile = googleUser?.getBasicProfile();
    //     email = profile?.getEmail(); 
    //     console.log(email);
    // }
    // function signOut() {
    //     var auth2 = gapi.auth2?.getAuthInstance();
    //     auth2?.signOut().then(function () {
    //         console.log("User signed out.");
    //     });
    // }


    // function onLoad() {
    //     gapi?.load('auth2', function() {
    //         gapi?.auth2.init();
    //     });
    // }
    // function signOut() {
    //     var auth2 = gapi?.auth2?.getAuthInstance();
    //     auth2?.signOut().then(function () {
    //         console.log('User signed out.');
    //     });
    // }

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
                    {/* <div className="g-signin2" data-width="220" data-height="60" data-onsuccess={onSignIn()}></div> */}
                    {/* <button className="logoutbutton" onClick={signOut()}>Sign out</button> */}

                    <Link to='/home'>
                        <button className='loginbtn'>LOGIN</button>
                    </Link>
                    {/* <button className='logoutbtn'>LOGOUT</button> */}
                </div>
            </div>
        </>
    )
}

export default GoogleLogin ;
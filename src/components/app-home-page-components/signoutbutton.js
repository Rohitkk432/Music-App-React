import React from "react";
import './nav.css';
import { GoogleLogout, useGoogleLogout } from 'react-google-login';
import {useNavigate} from 'react-router-dom';

function SignoutButton() {
    let navigate = useNavigate();

    const client_id = "132873793273-jga64pb0l5nd25g2kjsr8rqm10tpt9pe.apps.googleusercontent.com";

    const onLogoutSuccess = () =>{
        localStorage.removeItem('email');
        localStorage.removeItem('id');
        navigate('/')
    }

    const {signOut} = useGoogleLogout({
        client_id , onLogoutSuccess
    });

    // const clickSignout = ()=>{
    //     signOut();
    // }
    
        return(
            <>
                {/* <div className="nav-elements" onClick={clickSignout} >SignOut</div> */}
                <GoogleLogout 
                clientId="132873793273-jga64pb0l5nd25g2kjsr8rqm10tpt9pe.apps.googleusercontent.com"
                buttonText="Logout"
                onLogoutSuccess={signOut}
                className="nav-elements"
                >
                </GoogleLogout>
            </>
        )
}
export default SignoutButton ;
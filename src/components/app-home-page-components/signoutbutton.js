import React from "react";
import './nav.css';
import { useGoogleLogout } from 'react-google-login';
import {useHistory} from 'react-router-dom';

function SignoutButton() {
    let history = useHistory();

    const client_id = "132873793273-jga64pb0l5nd25g2kjsr8rqm10tpt9pe.apps.googleusercontent.com";

    const onLogoutSuccess = () =>{
        // console.log('logged out');
        history.push('/')
    }

    const {signOut} = useGoogleLogout({
        client_id , onLogoutSuccess
    });

    const clickSignout = ()=>{
        signOut();
    }
    
        return(
            <>
                <div className="nav-elements" onClick={clickSignout} >SignOut</div>
            </>
        )
}
export default SignoutButton ;
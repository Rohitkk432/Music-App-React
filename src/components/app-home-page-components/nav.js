// /* global gapi */
import React ,{useState} from 'react';
import './nav.css';
import logo from '../../images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';


function Nav (){
    // let signedout=false;
    const [isHidden ,setIsHidden] = useState(true);

    // function onLoad() {
    //     gapi?.load('auth2', function() {         //i dont think is required
    //         gapi?.auth2.init();
    //     });
    // }


    // function makegapi() {
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
    return (
        <>
            <nav>
                <div 
                className="nav">
                    <div className="logo-div"><img className="logo-img" src={logo} alt="logo" /></div>
                    <div className={isHidden ? "hidden1 nav-tabs" : "nav-tabs"}>
                        <Link to='/home'>
                            <div className="nav-elements home-nav">Home</div>
                        </Link>
                        <Link to='/playlist/1'>
                            <div className="nav-elements">Playlist</div>
                        </Link>
                        <div className="nav-elements">Liked</div>
                        <div className="nav-elements">Queue</div>
                        {/* <div className="nav-elements" onClick={signOut()}>Sign out</div> */}
                    </div>
                    <div className="profile-pic"></div>
                    <div  onClick={()=> setIsHidden(!isHidden)} className="hamburger"><FontAwesomeIcon icon={faBars} aria-hidden="true" /></div>
                </div>
            </nav>
        </>
    )
}

export default Nav ;
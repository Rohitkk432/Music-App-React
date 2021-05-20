import React ,{useState} from 'react';
import './nav.css';
import logo from '../../images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';
import SignoutButtton from './signoutbutton';


function Nav (){
    const [isHidden ,setIsHidden] = useState(true);

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
                        <SignoutButtton />
                    </div>
                    <div className="profile-pic"></div>
                    <div  onClick={()=> setIsHidden(!isHidden)} className="hamburger"><FontAwesomeIcon icon={faBars} aria-hidden="true" /></div>
                </div>
            </nav>
        </>
    )
}

export default Nav ;
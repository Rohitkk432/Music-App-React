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
                        <Link to='/home' style={{ textDecoration: 'none' }}>
                            <div className="nav-elements home-nav">Home</div>
                        </Link>
                        <Link to='/playlist/1' style={{ textDecoration: 'none' }}>
                            <div className="nav-elements">Playlist</div>
                        </Link>
                        <Link to='/liked' style={{ textDecoration: 'none' }}>
                            <div className="nav-elements">Liked</div>
                        </Link>
                        <SignoutButtton />
                    </div>
                    <div  onClick={()=> setIsHidden(!isHidden)} className="hamburger"><FontAwesomeIcon icon={faBars} aria-hidden="true" /></div>
                </div>
            </nav>
        </>
    )
}

export default Nav ;
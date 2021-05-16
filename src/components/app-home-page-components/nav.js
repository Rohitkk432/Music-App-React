import React ,{useState} from 'react';
import './nav.css';
import logo from '../../images/logo.png';

function Nav (){
    const [isHidden ,setIsHidden] = useState(true);
    return (
        <>
            <nav>
                <div className="nav">
                    <div className="logo-div"><img className="logo-img" src={logo} alt="logo" /></div>
                    <div className={isHidden ? "hidden1 nav-tabs" : "nav-tabs"}>
                        <p className="nav-elements home-nav">Home</p>
                        <p className="nav-elements">Playlist</p>
                        <p className="nav-elements">Liked</p>
                        <p className="nav-elements">Queue</p>
                    </div>
                    <div className="profile-pic"></div>
                    <div  onClick={()=> setIsHidden(!isHidden)} className="hamburger"><i className="fa fa-bars" aria-hidden="true"></i></div>
                </div>
            </nav>
        </>
    )
}

export default Nav ;
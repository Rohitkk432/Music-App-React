import {React,useState} from 'react';
import './musicUi.css';
import Player from './player';
import Queue from './queue';
import FooterPlayer from './footerplayer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';


function MusicUI(){
    const [isUp , setIsUp] = useState(false);
    return(
        <>
            <div className="musicUi">
                <div className={isUp ? "" : "hidden"}>
                    <div className="music-player">
                        <div className="music-controls">
                            <div onClick={() => setIsUp(!isUp)} className="arrow-down">
                                <FontAwesomeIcon className="arrows" icon={faAngleDown} aria-hidden="true" />
                            </div>
                            <Player />
                        </div>
                        <Queue />
                    </div>
                </div>

                <div className={isUp ? "hidden" : ""}>
                    <div className="foot-music-controls">
                        <div onClick={() => setIsUp(!isUp)} className="arrow-up">
                            <FontAwesomeIcon className="arrows" icon={faAngleUp} aria-hidden="true" />
                        </div>
                        <div className="footer-player">
                            <FooterPlayer />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MusicUI;
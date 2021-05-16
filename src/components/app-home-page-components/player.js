import React from 'react';
import './player.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRandom, faUndo, faStepBackward, faPlay, faStepForward, faPlus, faHeart} from '@fortawesome/free-solid-svg-icons';


function Player(){
    return(
        <>
            <div className="box-image"></div>
            <div className="controls">
                <FontAwesomeIcon className="icons" icon={faRandom} aria-hidden="true" />
                <FontAwesomeIcon className="icons" icon={faUndo} aria-hidden="true" />
                <FontAwesomeIcon className="icons" icon={faStepBackward} aria-hidden="true" />
                <FontAwesomeIcon className="icons" icon={faPlay} aria-hidden="true" />
                <FontAwesomeIcon className="icons" icon={faStepForward} aria-hidden="true" />
                <FontAwesomeIcon className="icons" icon={faPlus} aria-hidden="true" />
                <FontAwesomeIcon className="icons" icon={faHeart} aria-hidden="true" />
            </div>
        </>
    )
}

export default Player;
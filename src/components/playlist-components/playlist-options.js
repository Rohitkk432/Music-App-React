import React from 'react';
import './playlist-options.css';
import {Link} from 'react-router-dom';

function PlaylistOptions(){
    return(
        <>
            <div className="playlist-option-half">
                <Link to='/playlist/1'>
                    <div className="playlist-options">Playlist 1</div>
                </Link>
                <Link to='/playlist/2'>
                    <div className="playlist-options">Playlist 2</div>
                </Link>
                <Link to='/playlist/3'>
                    <div className="playlist-options">Playlist 3</div>
                </Link>
            </div>
        </>
    )
}

export default PlaylistOptions ;
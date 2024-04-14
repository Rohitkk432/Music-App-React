import React from 'react';
import './playlist-options.css';
import {Link} from 'react-router-dom';

function PlaylistOptions(){
    return(
        <>
            <div className="playlist-option-half">
                <Link to='/playlist/1' style={{ textDecoration: 'none' }}>
                    <div className="playlist-options pop1">Playlist 1</div>
                </Link>
                <Link to='/playlist/2' style={{ textDecoration: 'none' }}>
                    <div className="playlist-options pop2">Playlist 2</div>
                </Link>
                <Link to='/playlist/3' style={{ textDecoration: 'none' }}>
                    <div className="playlist-options pop3">Playlist 3</div>
                </Link>
            </div>
        </>
    )
}

export default PlaylistOptions ;
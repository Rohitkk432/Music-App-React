import React from 'react';
import './playlist-page.css';
import PlaylistOptions from './playlist-components/playlist-options';
import Playlist1 from "./playlist-components/playlist1";
import Playlist2 from "./playlist-components/playlist2";
import Playlist3 from "./playlist-components/playlist3";
import {Routes, Route} from 'react-router-dom';
import Nav from './app-home-page-components/nav';

function PlaylistPage(){
    return(
        <>
                <Nav />
                <div className="playlist-box">
                    <PlaylistOptions />
                    <Routes>
                        <Route path='/1' element={<Playlist1/>} />
                        <Route path='/2' element={<Playlist2/>} />
                        <Route path='/3' element={<Playlist3/>} />
                    </Routes>
                </div>
        </>
    )
}

export default PlaylistPage ;
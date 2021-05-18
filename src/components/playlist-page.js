import React from 'react';
import './playlist-page.css';
import PlaylistOptions from './playlist-components/playlist-options';
import Playlist1 from "./playlist-components/playlist1";
import Playlist2 from "./playlist-components/playlist2";
import Playlist3 from "./playlist-components/playlist3";
import {Switch, Route} from 'react-router-dom';
import Nav from './app-home-page-components/nav';

function PlaylistPage(){
    return(
        <>
                <Nav />
                <div className="playlist-box">
                    <PlaylistOptions />
                    <Switch>
                        <Route path='/playlist/1' component={Playlist1} />
                        <Route path='/playlist/2' component={Playlist2} />
                        <Route path='/playlist/3' component={Playlist3} />
                    </Switch>
                </div>
        </>
    )
}

export default PlaylistPage ;
import {React, useEffect, useState} from 'react';
import './playlist.css';
import { Scrollbars } from 'react-custom-scrollbars-2';
import PlaylistBox from './playlist-box';
import {delPlaylist,delQueueAddPlaylist,getFullPlaylist} from '../../methods';

function Playlist3 (){

    const currentId = localStorage.getItem('id');

    const [fullPlaylist3, setFullPlaylist3] = useState([]);
    const [pupdate, setPupdate] = useState(0);

    useEffect(()=>{
        getFullPlaylist(currentId,3).then((playlist)=>setFullPlaylist3(playlist))
    },[currentId,pupdate]);

    return(
        <>
            <div className="playlist-list">
                <div className="playlist-title">
                    <div>Playlist 3</div>
                    <button className="clear-list-btn-playlist" onClick={(e)=>{
                        e.preventDefault();
                        delPlaylist(currentId,3);
                        setFullPlaylist3([]);
                    }}>Clear All</button>
                    <button className="clear-list-btn-playlist" onClick={(e)=>{
                        e.preventDefault();
                        delQueueAddPlaylist(currentId,3);
                    }}>Play</button>
                </div>
                <Scrollbars style={{width:"80%", height: "57vh"}} >
                    {fullPlaylist3.map((song, idx) => (
                        <PlaylistBox playlistno={1} updater={[pupdate,setPupdate]} {...song} key={idx} />
                    ))}
                </Scrollbars> 
            </div>
        </>
    )    
}

export default Playlist3 ;
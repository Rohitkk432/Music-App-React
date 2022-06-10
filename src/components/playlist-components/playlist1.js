import {React, useEffect, useState} from 'react';
import './playlist.css';
import { Scrollbars } from 'react-custom-scrollbars-2';
import PlaylistBox from './playlist-box';
import {delPlaylist,delQueueAddPlaylist,getFullPlaylist} from '../../methods';

function Playlist1 (){

    const currentId = localStorage.getItem('id');

    const [fullPlaylist1, setFullPlaylist1] = useState([]);
    const [pupdate, setPupdate] = useState(0);

    useEffect(()=>{
        getFullPlaylist(currentId,1).then((playlist)=>setFullPlaylist1(playlist))
    },[currentId,pupdate]);

    return(
        <>
            <div className="playlist-list">
                <div className="playlist-title">
                    <div className="ptitle">Playlist 1</div>
                    <button className="clear-list-btn-playlist" onClick={(e)=>{
                        e.preventDefault();
                        delPlaylist(currentId,1);
                        setFullPlaylist1([]);
                    }}>Clear All</button>
                    <button className="clear-list-btn-playlist" onClick={(e)=>{
                        e.preventDefault();
                        delQueueAddPlaylist(currentId,1);
                    }}>Play</button>
                </div>
                <Scrollbars style={{width:"80%", height: "57vh"}} >
                    {fullPlaylist1.map((song, idx) => (
                        <PlaylistBox playlistno={1} updater={[pupdate,setPupdate]} {...song} key={idx} />
                    ))}
                </Scrollbars> 
            </div>
        </>
    )    
}

export default Playlist1 ;
import {React, useEffect, useState} from 'react';
import './playlist.css';
import { Scrollbars } from 'react-custom-scrollbars-2';
import PlaylistBox from './playlist-box';
import {delPlaylist,delQueueAddPlaylist,getFullPlaylist} from '../../methods';

function Playlist2 (){

    const currentId = localStorage.getItem('id');

    const [fullPlaylist2, setFullPlaylist2] = useState([]);
    const [pupdate, setPupdate] = useState(0);

    useEffect(()=>{
        getFullPlaylist(currentId,2).then((playlist)=>setFullPlaylist2(playlist))
    },[currentId,pupdate]);

    return(
        <>
            <div className="playlist-list">
                <div className="playlist-title">
                    <div className="ptitle" >Playlist 2</div>
                    <button className="clear-list-btn-playlist" onClick={(e)=>{
                        e.preventDefault();
                        delPlaylist(currentId,2);
                        setFullPlaylist2([]);
                    }}>Clear All</button>
                    <button className="clear-list-btn-playlist" onClick={(e)=>{
                        e.preventDefault();
                        delQueueAddPlaylist(currentId,2);
                    }}>Play</button>
                </div>
                <Scrollbars style={{width:"80%", height: "57vh"}} >
                    {fullPlaylist2.map((song, idx) => (
                        <PlaylistBox playlistno={2} updater={[pupdate,setPupdate]} {...song} key={idx} />
                    ))}
                </Scrollbars> 
            </div>
        </>
    )    
}

export default Playlist2 ;
import {React} from 'react';
import './playlist.css';
import { Scrollbars } from 'react-custom-scrollbars';
import PlaylistBox from './playlist-box';
import {getFullPlaylist} from '../../methods';
import {currentId} from '../login_page_components/googlelogin';

function Playlist3(){
    
    let fullPlaylist3;
    getFullPlaylist(currentId,3)
        .then((res)=>{
            fullPlaylist3=res;
        })

    return(
        <>
            <div className="playlist-list">
                <div className="playlist-title">Playlist 3</div>
                <Scrollbars style={{width:"80%", height: "57vh"}}>
                    {fullPlaylist3?.map((song, idx) => (
                            <PlaylistBox {...song} key={idx} />
                        ))}
                </Scrollbars> 
            </div>
        </>
    )
}

export default Playlist3 ;
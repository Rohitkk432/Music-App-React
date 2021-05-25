import {React} from 'react';
import './playlist.css';
import { Scrollbars } from 'react-custom-scrollbars';
import PlaylistBox from './playlist-box';
import {getFullPlaylist} from '../../methods';
import {currentId} from '../login_page_components/googlelogin';

function Playlist2(){

    let fullPlaylist2;
    getFullPlaylist(currentId,2)
        .then((res)=>{
            fullPlaylist2=res;
        })

    return(
        <>
            <div className="playlist-list">
                <div className="playlist-title">Playlist 2</div>
                <Scrollbars style={{width:"80%", height: "57vh"}}>
                    {fullPlaylist2?.map((song, idx) => (
                            <PlaylistBox {...song} key={idx} />
                        ))}
                </Scrollbars> 
            </div>
        </>
    )
}

export default Playlist2 ;
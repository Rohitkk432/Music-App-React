import {React} from 'react';
import './playlist.css';
import { Scrollbars } from 'react-custom-scrollbars';
import PlaylistBox from './playlist-box';
import {getFullPlaylist} from '../../methods';
import {currentId} from '../login_page_components/googlelogin';

function Playlist1(){

    let fullPlaylist1;
    getFullPlaylist(currentId,1)
        .then((res)=>{
            fullPlaylist1=res;
        })

    return(
        <>
            <div className="playlist-list">
                <div className="playlist-title">Playlist 1</div>
                <Scrollbars style={{width:"80%", height: "57vh"}} >
                    {fullPlaylist1?.map((song, idx) => (
                            <PlaylistBox {...song} key={idx} />
                        ))}
                </Scrollbars> 
            </div>
        </>
    )
}

export default Playlist1 ;
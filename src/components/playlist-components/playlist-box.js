import { useState, React } from 'react';
import './playlist.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faHeart,faMinus } from '@fortawesome/free-solid-svg-icons';
import {checkAddSongInLiked,checkAddSongInPlaylist,checkAddSongInQueue,delSongInPlaylist} from '../../methods';
import {currentId} from '../login_page_components/googlelogin';

function PlaylistBox(props){
    const {song_id,title,singer,imgpath,duration,playlist_number} =props;
    const [modalOpen,setModal]=useState(false);


    function AddModal (){
        return(
            <div className={modalOpen?"P-add-modal":"P-hidden2"}>
                <button className="P-modal-options" onClick={(e)=>{
                    e.preventDefault();
                    checkAddSongInQueue(currentId,song_id)
                }}>Queue</button>
                <button className="P-modal-options" onClick={(e)=>{
                    e.preventDefault();
                    checkAddSongInPlaylist(currentId,song_id,1);
                }}>Playlist1</button>
                <button className="P-modal-options" onClick={(e)=>{
                    e.preventDefault();
                    checkAddSongInPlaylist(currentId,song_id,2);
                }}>Playlist2</button>
                <button className="P-modal-options" onClick={(e)=>{
                    e.preventDefault();
                    checkAddSongInPlaylist(currentId,song_id,3);
                }}>Playlist3</button>
            </div>
        )
    }

    return(
        <div className="playlist-list-box">
            <div className="P-cover-img">
                <img src={imgpath} alt="img" />
            </div>
            <div className="P-result-info">
                <div className="P-result-title">{title}</div>
                <div className="P-result-artist-duration">
                    <div className="P-result-artist">{singer}</div>
                    <div className="P-result-duration">{duration}</div>
                </div>
            </div>
            <div className="P-result-options">
                <div className="P-add-btn">
                    <FontAwesomeIcon onClick={()=>setModal(!modalOpen)} className="P-icons-option" icon={faPlus} aria-hidden="true" />
                    <AddModal/>
                </div>
                <FontAwesomeIcon className="P-icons-option" onClick={(e)=>{
                e.preventDefault();
                checkAddSongInLiked(currentId,song_id);
                }} icon={faHeart} aria-hidden="true" />
                <FontAwesomeIcon className="P-icons-option" onClick={(e)=>{
                e.preventDefault();
                delSongInPlaylist(currentId,song_id,playlist_number);
                }} icon={faMinus} aria-hidden="true" />
            </div>
        </div>
    )
} 

export default PlaylistBox;
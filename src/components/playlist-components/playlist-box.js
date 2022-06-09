import { useState, React } from 'react';
import './playlist.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faHeart,faMinus } from '@fortawesome/free-solid-svg-icons';
import {checkAddSongInLiked,checkAddSongInPlaylist,checkAddSongInQueue,delSongInPlaylist} from '../../methods';

function PlaylistBox(props){
    const {song_id,title,singer,imgpath,duration,playlist_number} =props;
    const [modalOpen,setModal]=useState(false);

    const [pupdate, setPupdate] = props.updater;

    const playlistno = props.playlistno

    const currentId = localStorage.getItem('id');

    function AddModal (){
        return(
            <div className={modalOpen?"P-add-modal":"P-hidden2"}>
                <button className="P-modal-options" onClick={(e)=>{
                    e.preventDefault();
                    checkAddSongInQueue(currentId,song_id)
                    setModal(!modalOpen)
                }}>Queue</button>
                <button className={(playlistno!==1)?"P-modal-options":"hidep"} onClick={(e)=>{
                    e.preventDefault();
                    checkAddSongInPlaylist(currentId,song_id,1);
                    setModal(!modalOpen)
                }}>Playlist1</button>
                <button className={(playlistno!==2)?"P-modal-options":"hidep"} onClick={(e)=>{
                    e.preventDefault();
                    checkAddSongInPlaylist(currentId,song_id,2);
                    setModal(!modalOpen)
                }}>Playlist2</button>
                <button className={(playlistno!==3)?"P-modal-options":"hidep"} onClick={(e)=>{
                    e.preventDefault();
                    checkAddSongInPlaylist(currentId,song_id,3);
                    setModal(!modalOpen)
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
                setPupdate(pupdate+1);
                }} icon={faMinus} aria-hidden="true" />
            </div>
        </div>
    )
} 

export default PlaylistBox;
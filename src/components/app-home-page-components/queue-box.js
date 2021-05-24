import { useState, React } from 'react';
import './queue.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faHeart } from '@fortawesome/free-solid-svg-icons';
import {checkAddSongInLiked,checkAddSongInPlaylist,checkAddSongInQueue} from '../../methods';
import {currentId} from '../login_page_components/googlelogin';

function QueueBox(props){
    const {song_id,title,singer,imgpath,duration} =props;
    const [modalOpen,setModal]=useState(false);


    function AddModal (){
        return(
            <div className={modalOpen?"Q-add-modal":"Q-hidden2"}>
                <button className="Q-modal-options" onClick={(e)=>{
                    e.preventDefault();
                    checkAddSongInQueue(currentId,song_id)
                }}>Queue</button>
                <button className="Q-modal-options" onClick={(e)=>{
                    e.preventDefault();
                    checkAddSongInPlaylist(currentId,song_id,1);
                }}>Playlist1</button>
                <button className="Q-modal-options" onClick={(e)=>{
                    e.preventDefault();
                    checkAddSongInPlaylist(currentId,song_id,2);
                }}>Playlist2</button>
                <button className="Q-modal-options" onClick={(e)=>{
                    e.preventDefault();
                    checkAddSongInPlaylist(currentId,song_id,3);
                }}>Playlist3</button>
            </div>
        )
    }

    return(
        <div className="queue-list-box">
            <div className="Q-cover-img">
                <img src={imgpath} alt="img" />
            </div>
            <div className="Q-result-info">
                <div className="Q-result-title">{title}</div>
                <div className="Q-result-artist-duration">
                    <div className="Q-result-artist">{singer}</div>
                    <div className="Q-result-duration">{duration}</div>
                </div>
            </div>
            <div className="Q-result-options">
                <div className="Q-add-btn">
                    <FontAwesomeIcon onClick={()=>setModal(!modalOpen)} className="Q-icons-option" icon={faPlus} aria-hidden="true" />
                    <AddModal/>
                </div>    
                <FontAwesomeIcon className="Q-icons-option" onClick={(e)=>{
                e.preventDefault();
                checkAddSongInLiked(currentId,song_id);
                }} icon={faHeart} aria-hidden="true" />
            </div>
        </div>
    )
} 
export default QueueBox;
import { useState, React } from 'react';
import './liked-page.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faHeart } from '@fortawesome/free-solid-svg-icons';
import {checkAddSongInLiked,checkAddSongInPlaylist,checkAddSongInQueue} from '../methods';
import {currentId} from './login_page_components/googlelogin';

function LikedBox(props){
    const {song_id,title,singer,imgpath,duration} =props;
    const [modalOpen,setModal]=useState(false);


    function AddModal (){
        return(
            <div className={modalOpen?"L-add-modal":"L-hidden2"}>
                <button className="L-modal-options" onClick={(e)=>{
                    e.preventDefault();
                    checkAddSongInQueue(currentId,song_id)
                }}>Queue</button>
                <button className="L-modal-options" onClick={(e)=>{
                    e.preventDefault();
                    checkAddSongInPlaylist(currentId,song_id,1);
                }}>Playlist1</button>
                <button className="L-modal-options" onClick={(e)=>{
                    e.preventDefault();
                    checkAddSongInPlaylist(currentId,song_id,2);
                }}>Playlist2</button>
                <button className="L-modal-options" onClick={(e)=>{
                    e.preventDefault();
                    checkAddSongInPlaylist(currentId,song_id,3);
                }}>Playlist3</button>
            </div>
        )
    }

    return(
        <div className="queue-list-box">
            <div className="L-cover-img">
                <img src={imgpath} alt="img" />
            </div>
            <div className="L-result-info">
                <div className="L-result-title">{title}</div>
                <div className="L-result-artist-duration">
                    <div className="L-result-artist">{singer}</div>
                    <div className="L-result-duration">{duration}</div>
                </div>
            </div>
            <div className="L-result-options">
                <div className="L-add-btn">
                    <FontAwesomeIcon onClick={()=>setModal(!modalOpen)} className="L-icons-option" icon={faPlus} aria-hidden="true" />
                    <AddModal/>
                </div>    
                <FontAwesomeIcon className="L-icons-option" onClick={(e)=>{
                e.preventDefault();
                checkAddSongInLiked(currentId,song_id);
                }} icon={faHeart} aria-hidden="true" />
            </div>
        </div>
    )
} 
export default LikedBox;
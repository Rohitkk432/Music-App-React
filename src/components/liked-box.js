import { useState, React } from 'react';
import './liked-page.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import {checkAddSongInPlaylist,checkAddSongInQueue, delSongInLiked} from '../methods';

function LikedBox(props){
    const {song_id,title,singer,imgpath,duration} =props;
    const [modalOpen,setModal]=useState(false);
    const [lupdate, setLupdate] = props.updater;

    const currentId = localStorage.getItem('id');
    
    function AddModal (){
        return(
            <div className={modalOpen?"L-add-modal":"L-hidden2"}>
                <button className="L-modal-options" onClick={(e)=>{
                    e.preventDefault();
                    checkAddSongInQueue(currentId,song_id)
                    setModal(!modalOpen)
                }}>Queue</button>
                <button className="L-modal-options" onClick={(e)=>{
                    e.preventDefault();
                    checkAddSongInPlaylist(currentId,song_id,1);
                    setModal(!modalOpen)
                }}>Playlist1</button>
                <button className="L-modal-options" onClick={(e)=>{
                    e.preventDefault();
                    checkAddSongInPlaylist(currentId,song_id,2);
                    setModal(!modalOpen)
                }}>Playlist2</button>
                <button className="L-modal-options" onClick={(e)=>{
                    e.preventDefault();
                    checkAddSongInPlaylist(currentId,song_id,3);
                    setModal(!modalOpen)
                }}>Playlist3</button>
            </div>
        )
    }

    return(
        <div className="L-liked-box">
            <div className="L-result-box">
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
                    delSongInLiked(currentId,song_id);
                    setLupdate(lupdate+1);
                    }} icon={faMinus} aria-hidden="true" />
                </div>
            </div>
        </div>
    )
} 
export default LikedBox;
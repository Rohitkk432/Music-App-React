import {React,useState} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faPlus, faHeart } from '@fortawesome/free-solid-svg-icons';
import './songSearch.css';
import {checkAddSongInLiked,checkAddSongInPlaylist,checkAddSongInQueue} from '../../methods';
import {currentId} from '../login_page_components/googlelogin';

const SearchResult = function(props){
    const {id,title,singer,imgpath,duration} =props;
    const [modalOpen,setModal]=useState(false);
    

    function AddModal (){
        return(
            <div className={modalOpen?"add-modal":"hidden2"}>
                <button className="modal-options" onClick={(e)=>{
                    e.preventDefault();
                    checkAddSongInQueue(currentId,id)
                }}>Queue</button>
                <button className="modal-options" onClick={(e)=>{
                    e.preventDefault();
                    checkAddSongInPlaylist(currentId,id,1);
                }}>Playlist1</button>
                <button className="modal-options" onClick={(e)=>{
                    e.preventDefault();
                    checkAddSongInPlaylist(currentId,id,2);
                }}>Playlist2</button>
                <button className="modal-options" onClick={(e)=>{
                    e.preventDefault();
                    checkAddSongInPlaylist(currentId,id,3);
                }}>Playlist3</button>
            </div>
        )
    }

        return (
            <div className="result-box">
                <div className="cover-img">
                    <img src={imgpath} alt="img" />
                </div>
                <div className="result-info">
                    <div className="result-title">{title}</div>
                    <div className="result-artist-duration">
                        <div className="result-artist">{singer}</div>
                        <div className="result-duration">{duration}</div>
                    </div>
                </div>
                <div className="result-options">
                    <div className="add-btn">
                        <FontAwesomeIcon  onClick={()=>setModal(!modalOpen)} className="icons-option" icon={faPlus}    aria-hidden="true" />
                        <AddModal/>
                    </div>
                    <FontAwesomeIcon className="icons-option" onClick={(e)=>{
                    e.preventDefault();
                    checkAddSongInLiked(currentId,id);
                    }} icon={faHeart} aria-hidden="true" />
                </div>
            </div>
        );
}

export default SearchResult;
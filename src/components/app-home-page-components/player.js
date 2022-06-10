import { React,useState,useEffect } from 'react';
import './player.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRandom, faUndo, faStepBackward, faStepForward} from '@fortawesome/free-solid-svg-icons';
import ReactAudioPlayer from 'react-audio-player';
import {getFullQueue} from '../../methods';


function Player (params){

    const [songIndex, setSongIndex] = useState(0);
    const [loop, setLoop] = useState(false);
    const [autoplay, setAutoplay] = useState(false);
    const [fullQueue, setFullQueue] = params.data;

    const [updater,setUpdater] = params.updateO;

    let queueLength = fullQueue.length;

    const currentId = localStorage.getItem('id');

    useEffect(()=>{
        if(currentId!==null){
            getFullQueue(currentId).then((list)=>{setFullQueue(list)});
        }
    },[currentId,updater,setFullQueue]);

    
    //to remove warnings
    if(fullQueue === 0){
        setFullQueue(fullQueue);
        if(false){
            setUpdater(updater)
        }
    }

    return(
        <div className="musicprox-player">
            <div className="box-image">
                <img src={fullQueue?.[songIndex]?.imgpath} alt="" />
            </div>
            <ReactAudioPlayer
                src={fullQueue?.[songIndex]?.audiopath}
                autoPlay={autoplay}
                controls={true}
                loop={loop}
                controlsList="nodownload"
                style={{width:"90%",height:"3rem"}}
                onEnded={()=>{
                    if(songIndex!==queueLength-1){
                        setSongIndex(songIndex+1)
                    }else if(songIndex===queueLength-1){
                        setSongIndex(0)
                    }
                }}
            />
            <div className="controls">
                {/* AutoPlay */}
                <div className={autoplay ? "icons autoplay-active":"icons autoplay"} onClick={()=>{
                    setAutoplay(!autoplay)
                }} >AutoPlay</div>
                {/* Random song of queue */}
                <FontAwesomeIcon className="icons" onClick={()=>{
                    setSongIndex(Math.trunc(Math.random()*queueLength))
                }} icon={faRandom} aria-hidden="true" />
                {/* loop over same song */}
                <FontAwesomeIcon className={loop ? "icons icons-active":"icons"} onClick={()=>{
                    setLoop(!loop)
                }} icon={faUndo} aria-hidden="true" />
                {/* last song */}
                <FontAwesomeIcon className="icons" onClick={()=>{
                if(songIndex!==0){
                    setSongIndex(songIndex-1)
                }else if(songIndex===0){
                    setSongIndex(queueLength-1)
                }
                }} icon={faStepBackward} aria-hidden="true" />
                {/* next song */}
                <FontAwesomeIcon className="icons" onClick={()=>{
                if(songIndex!==queueLength-1){
                    setSongIndex(songIndex+1)
                }else if(songIndex===queueLength-1){
                    setSongIndex(0);
                }
                }} icon={faStepForward} aria-hidden="true" />
            </div>
        </div>
    )
}

export default Player;

import React, { Component } from 'react';
import './player.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRandom, faUndo, faStepBackward, faStepForward} from '@fortawesome/free-solid-svg-icons';
import ReactAudioPlayer from 'react-audio-player';


class Player extends Component{
    constructor(){
        super();
        this.state = {songIndex:0 , loop:false, autoplay:false};
    }
    render(){
        let queueLength=(this.props.data.fullQueue).length;
        return(
            <div className="musicprox-player">
                <div className="box-image">
                    <img src={this.props.data.fullQueue?.[this.state.songIndex]?.imgpath} alt="" />
                </div>
                <ReactAudioPlayer
                    src={this.props.data.fullQueue?.[this.state.songIndex]?.audiopath}
                    autoPlay={this.state.autoplay}
                    controls={true}
                    loop={this.state.loop}
                    controlsList="nodownload"
                    style={{width:"90%",height:"3rem"}}
                    onEnded={()=>{
                        if(this.state.songIndex!==queueLength-1){
                            this.setState({songIndex:(this.state.songIndex+1)})
                        }else if(this.state.songIndex===queueLength-1){
                            this.setState({songIndex:0})
                        }
                    }}
                />
                <div className="controls">

                    {/* AutoPlay */}
                    <div className={this.state.autoplay ? "icons autoplay-active":"icons autoplay"} onClick={()=>{
                    this.setState({autoplay:(!this.state.autoplay)})
                    }} >AutoPlay</div>

                    {/* Random song of queue */}
                    <FontAwesomeIcon className="icons" onClick={()=>{
                        this.setState({songIndex:Math.trunc(Math.random()*queueLength)});
                    }} icon={faRandom} aria-hidden="true" />

                    {/* loop over same song */}
                    <FontAwesomeIcon className={this.state.loop ? "icons icons-active":"icons"} onClick={()=>{
                    this.setState({loop:(!this.state.loop)})
                    }} icon={faUndo} aria-hidden="true" />

                    {/* last song */}
                    <FontAwesomeIcon className="icons" onClick={()=>{
                    if(this.state.songIndex!==0){
                        this.setState({songIndex:(this.state.songIndex-1)})
                    }else if(this.state.songIndex===0){
                        this.setState({songIndex:queueLength-1})
                    }
                    }} icon={faStepBackward} aria-hidden="true" />

                    {/* next song */}
                    <FontAwesomeIcon className="icons" onClick={()=>{
                    if(this.state.songIndex!==queueLength-1){
                        this.setState({songIndex:(this.state.songIndex+1)})
                    }else if(this.state.songIndex===queueLength-1){
                        this.setState({songIndex:0})
                    }
                    }} icon={faStepForward} aria-hidden="true" />
                </div>

            </div>
        )
    }
}

export default Player;
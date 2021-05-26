import {Component, React} from 'react';
import './musicUi.css';
import Player from './player';
import Queue from './queue';
import FooterPlayer from './footerplayer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import SongSearch from './songSearch';
import {currentId} from '../login_page_components/googlelogin';


class MusicUI extends Component{
    constructor(){
        super();
        this.state = { isUp:false , fullQueue: [] };
    }
    async componentDidMount() {

        await fetch(`https://safe-eyrie-59676.herokuapp.com/https://music-pro-x-server.herokuapp.com/queue/${currentId}`)
        .then((res)=> res.json())
        .then((queueList)=>{
            // console.log("queue);
            this.setState({fullQueue:queueList})
        })
        .catch((err)=>console.log(err));

    }
    render(){
        return(
            <>  
                <div className={this.state.isUp ? "hidden" : ""}>
                    <SongSearch />
                </div>
                <div className="musicUi">
                    <div className={this.state.isUp ? "" : "hidden"}>
                        <div className="music-player">
                            <div className="music-controls">
                                <div onClick={() => this.setState({isUp:(!this.state.isUp)})} className="arrow-down">
                                    <FontAwesomeIcon className="arrows" icon={faAngleDown} aria-hidden="true" />
                                </div>
                                <Player data={{fullQueue:this.state.fullQueue}} />
                            </div>
                            <Queue data={{fullQueue:this.state.fullQueue}} />
                        </div>
                    </div>

                    <div className={this.state.isUp ? "hidden" : ""}>
                        <div className="foot-music-controls">
                            <div onClick={() => this.setState({isUp:(!this.state.isUp)})} className="arrow-up">
                                <FontAwesomeIcon className="arrows" icon={faAngleUp} aria-hidden="true" />
                            </div>
                            <div className="footer-player">
                                <FooterPlayer />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default MusicUI;
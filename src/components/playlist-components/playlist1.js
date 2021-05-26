import {Component, React} from 'react';
import './playlist.css';
import { Scrollbars } from 'react-custom-scrollbars';
import PlaylistBox from './playlist-box';
import {delPlaylist,delQueueAddPlaylist} from '../../methods';
import {currentId} from '../login_page_components/googlelogin';

class Playlist1 extends Component{

    constructor(){
        super();
        this.state = { fullPlaylist1: []};
        
    }
    async componentDidMount() {

        await fetch(`https://safe-eyrie-59676.herokuapp.com/https://music-pro-x-server.herokuapp.com/playlist/${currentId}/1`,{
            method:"GET",
        })
        .then((res)=>res.json())
        .then((playlist)=>{
            // console.log("playlist1");
            this.setState({fullPlaylist1:playlist})
        })
        .catch((err)=>console.log(err));
    
    }
    render(){
        return(
            <>
                <div className="playlist-list">
                    <div className="playlist-title">
                        <div>Playlist 1</div>
                        <button className="clear-list-btn-playlist" onClick={(e)=>{
                            e.preventDefault();
                            delPlaylist(currentId,1);
                        }}>Clear All</button>
                        <button className="clear-list-btn-playlist" onClick={(e)=>{
                            e.preventDefault();
                            delQueueAddPlaylist(currentId,1);
                        }}>Play</button>
                    </div>
                    <Scrollbars style={{width:"80%", height: "57vh"}} >
                        {this.state.fullPlaylist1.map((song, idx) => (
                                <PlaylistBox {...song} key={idx} />
                            ))}
                    </Scrollbars> 
                </div>
            </>
        )
    }
    
}

export default Playlist1 ;
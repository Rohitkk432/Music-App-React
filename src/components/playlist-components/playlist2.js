import {Component, React} from 'react';
import './playlist.css';
import { Scrollbars } from 'react-custom-scrollbars';
import PlaylistBox from './playlist-box';
import {delPlaylist,delQueueAddPlaylist} from '../../methods';
import {currentId} from '../login_page_components/googlelogin';

class Playlist2 extends Component{

    constructor(){
        super();
        this.state = { fullPlaylist2: []};
        
    }
    async componentDidMount() {

        await fetch(`https://safe-eyrie-59676.herokuapp.com/https://music-pro-x-server.herokuapp.com/playlist/${currentId}/2`,{
            method:"GET",
        })
        .then((res)=>res.json())
        .then((playlist)=>{
            // console.log("playlist2");
            this.setState({fullPlaylist2:playlist})
        })
        .catch((err)=>console.log(err));
    
    }
    render(){
        return(
            <>
                <div className="playlist-list">
                    <div className="playlist-title">
                        <div>Playlist 2</div>
                        <button className="clear-list-btn-playlist" onClick={(e)=>{
                            e.preventDefault();
                            delPlaylist(currentId,2);
                        }}>Clear All</button>
                        <button className="clear-list-btn-playlist" onClick={(e)=>{
                            e.preventDefault();
                            delQueueAddPlaylist(currentId,2);
                        }}>Play</button>
                    </div>
                    <Scrollbars style={{width:"80%", height: "57vh"}}>
                        {this.state.fullPlaylist2.map((song, idx) => (
                            <PlaylistBox {...song} key={idx} />
                        ))}
                    </Scrollbars> 
                </div>
            </>
        )
    }
}

export default Playlist2 ;
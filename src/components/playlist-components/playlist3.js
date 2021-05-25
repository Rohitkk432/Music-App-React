import {Component, React} from 'react';
import './playlist.css';
import { Scrollbars } from 'react-custom-scrollbars';
import PlaylistBox from './playlist-box';
// import {getFullPlaylist} from '../../methods';
import {currentId} from '../login_page_components/googlelogin';

class Playlist3 extends Component{
    
    constructor(){
        super();
        this.state = { fullPlaylist3: [] };
        
    }
    async componentDidMount() {

        await fetch(`http://localhost:5000/playlist/${currentId}/3`,{
            method:"GET",
        })
        .then((res)=>res.json())
        .then((playlist)=>{
            console.log("playlist3");
            this.setState({fullPlaylist3:playlist})
        })
        .catch((err)=>console.log(err));
    
    }
    render(){
        return(
            <>
                <div className="playlist-list">
                    <div className="playlist-title">Playlist 3</div>
                    <Scrollbars style={{width:"80%", height: "57vh"}}>
                        {this.state.fullPlaylist3.map((song, idx) => (
                            <PlaylistBox {...song} key={idx} />
                        ))}
                    </Scrollbars> 
                </div>
            </>
        )
    }
}

export default Playlist3 ;
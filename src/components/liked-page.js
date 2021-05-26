import { Component, React } from 'react';
import Nav from './app-home-page-components/nav';
import './liked-page.css';
import { Scrollbars } from 'react-custom-scrollbars';
import {delLiked} from '../methods'
import {currentId} from './login_page_components/googlelogin';
import LikedBox from './liked-box';

class LikedPage extends Component{
    constructor(){
        super();
        this.state = { fullLiked: [] };
        
    }
    async componentDidMount() {

        await fetch(`https://music-pro-x-server.herokuapp.com/liked/${currentId}`)
        .then((res)=>res.json())
        .then((likedList)=>{
            // console.log("liked");
            this.setState({fullLiked:likedList})
        })
        .catch((err)=>console.log(err));
    
    }
    render(){
        return(
            <div className='liked-page'>
                <Nav />
                <div className="liked-data">
                    <div className="liked-head">
                        <div className="liked-title">Liked Songs</div>
                        <button className="clear-list-btn" onClick={(e)=>{
                            e.preventDefault();
                            delLiked(currentId);
                        }}>Clear All</button>
                    </div>
                    <div className="liked-container">
                        <Scrollbars style={{ width:"90%", height: "79vh" }}>
                            {this.state.fullLiked.map((song, idx) => (
                                <LikedBox {...song} key={idx} />
                            ))}
                        </Scrollbars>
                    </div>
                </div>
            </div>
        )
    }
}

export default LikedPage ;
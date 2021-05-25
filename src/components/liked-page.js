import { React } from 'react';
import Nav from './app-home-page-components/nav';
import './liked-page.css';
import { Scrollbars } from 'react-custom-scrollbars';
import {getFullLiked} from '../methods';
import {currentId} from './login_page_components/googlelogin';
import LikedBox from './liked-box';

function LikedPage(){
    let fullLiked;
    getFullLiked(currentId)
        .then((res)=>{
            fullLiked=res;
        })

    return(
        <div className='liked-page'>
            <Nav />
            <div className="liked-data">
                <div className="liked-head">
                    <div className="liked-title">Liked Songs</div>
                    <button className="clear-list-btn">Clear All</button>
                </div>
                <div className="liked-container">
                    <Scrollbars style={{ width:"90%", height: "79vh" }}>
                        {fullLiked?.map((song, idx) => (
                            <LikedBox {...song} key={idx} />
                        ))}
                    </Scrollbars>
                </div>
            </div>
        </div>
    )
}

export default LikedPage ;
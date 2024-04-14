import { React, useState, useEffect } from 'react';
import Nav from './app-home-page-components/nav';
import './liked-page.css';
import { Scrollbars } from 'react-custom-scrollbars-2';
import {delLiked,getFullLiked} from '../methods'
import LikedBox from './liked-box';

function LikedPage (){
    const [fullLiked, setFullLiked] = useState([]);
    const [lupdate, setLupdate] = useState(0);

    const currentId = localStorage.getItem('id');
    
    useEffect(()=>{
        getFullLiked(currentId).then((list)=>{setFullLiked(list)});
    },[currentId,lupdate]);

    return(
        <div className='liked-page'>
            <Nav />
            <div className="liked-data">
                <div className="liked-head">
                    <div className="liked-title">Liked Songs</div>
                    <button className="clear-list-btn" onClick={(e)=>{
                        e.preventDefault();
                        delLiked(currentId);
                        setFullLiked([]);
                    }}>Clear All</button>
                </div>
                <div className="liked-container">
                    <Scrollbars style={{ width:"90%", height: "79vh" }}>
                        {fullLiked.map((song, idx) => (
                            <LikedBox updater={[lupdate,setLupdate]} {...song} key={idx} />
                        ))}
                    </Scrollbars>
                </div>
            </div>
        </div>
    )
}

export default LikedPage ;
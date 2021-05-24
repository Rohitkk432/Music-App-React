import {useState, React} from 'react';
import './playlist.css';
import { Scrollbars } from 'react-custom-scrollbars';
import PlaylistBox from './playlist-box';
import {getFullPlaylist} from '../../methods';
import {currentId} from '../login_page_components/googlelogin';

function Playlist3(){
    const [scrollWidth,setScrollWidth]=useState("32rem");
    if(window.innerWidth<620 && window.innerWidth>460 && scrollWidth!=="25rem"){
        setScrollWidth("25rem");
    }else if(window.innerWidth>620 && scrollWidth!=="32rem"){
        setScrollWidth("32rem");
    }else if(window.innerWidth<461 && scrollWidth!=="21rem"){
            setScrollWidth("21rem");
    }
    window.addEventListener("resize", handleResize);
    function handleResize(){
        if(window.innerWidth<620 && window.innerWidth>460 && scrollWidth!=="25rem"){
            setScrollWidth("25rem");
        }else if(window.innerWidth>620 && scrollWidth!=="32rem"){
            setScrollWidth("32rem");
        }else if(window.innerWidth<461 && scrollWidth!=="21rem"){
            setScrollWidth("21rem");
        }
    }
    
    let fullPlaylist3;
    getFullPlaylist(currentId,3)
        .then((res)=>{
            fullPlaylist3=res;
        })

    return(
        <>
            <div className="playlist-list">
                <div className="playlist-title">Playlist 3</div>
                <Scrollbars style={{width:scrollWidth, height: "25rem"}}>
                    {fullPlaylist3?.map((song, idx) => (
                            <PlaylistBox {...song} key={idx} />
                        ))}
                </Scrollbars> 
            </div>
        </>
    )
}

export default Playlist3 ;
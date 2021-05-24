import {useState, React} from 'react';
import './playlist.css';
import { Scrollbars } from 'react-custom-scrollbars';
import PlaylistBox from './playlist-box';
import {getFullPlaylist} from '../../methods';
import {currentId} from '../login_page_components/googlelogin';

function Playlist2(){
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

    let fullPlaylist2;
    getFullPlaylist(currentId,2)
        .then((res)=>{
            fullPlaylist2=res;
        })

    return(
        <>
            <div className="playlist-list">
                <div className="playlist-title">Playlist 2</div>
                <Scrollbars style={{width:scrollWidth, height: "25rem"}}>
                    {fullPlaylist2?.map((song, idx) => (
                            <PlaylistBox {...song} key={idx} />
                        ))}
                </Scrollbars> 
            </div>
        </>
    )
}

export default Playlist2 ;
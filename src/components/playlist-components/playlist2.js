import {useState, React} from 'react';
import './playlist.css';
import { Scrollbars } from 'react-custom-scrollbars';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faHeart } from '@fortawesome/free-solid-svg-icons';

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
    return(
        <>
            <div className="playlist-list">
                <div className="playlist-title">Playlist 2</div>
                <Scrollbars style={{width:scrollWidth, height: "25rem"}}>
                    <PlaylistBox/>
                    <PlaylistBox/>
                    <PlaylistBox/>
                    <PlaylistBox/>
                    <PlaylistBox/>
                    <PlaylistBox/>
                    <PlaylistBox/>
                    <PlaylistBox/>
                </Scrollbars> 
            </div>
        </>
    )
}

function PlaylistBox(){
    return(
        <div className="playlist-list-box">
            <div className="P-cover-img">
                {/* <img src="" alt="img" /> */}
            </div>
            <div className="P-result-info">
                <div className="P-result-title"></div>
                <div className="P-result-artist-duration">
                    <div className="P-result-artist"></div>
                    <div className="P-result-duration"></div>
                </div>
            </div>
            <div className="P-result-options">
                <FontAwesomeIcon className="P-icons-option" icon={faPlus} aria-hidden="true" />
                <FontAwesomeIcon className="P-icons-option" icon={faHeart} aria-hidden="true" />
            </div>
        </div>
    )
} 

export default Playlist2 ;
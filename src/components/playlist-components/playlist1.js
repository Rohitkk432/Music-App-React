import {useState, React} from 'react';
import './playlist.css';
import { Scrollbars } from 'react-custom-scrollbars';

function Playlist1(){
    const [scrollWidth,setScrollWidth]=useState("32rem");
    if(window.innerWidth<620 && scrollWidth!=="25rem"){
        setScrollWidth("25rem");
    }else if(window.innerWidth>620 && scrollWidth!=="32rem"){
        setScrollWidth("32rem");
    }
    window.addEventListener("resize", handleResize);
    function handleResize(){
        if(window.innerWidth<620 && scrollWidth!=="25rem"){
            setScrollWidth("25rem");
        }else if(window.innerWidth>620 && scrollWidth!=="32rem"){
            setScrollWidth("32rem");
        }
    }
    return(
        <>
            <div className="playlist-list">
                <div className="playlist-title">Playlist 1</div>
                <Scrollbars style={{width:scrollWidth, height: "25rem"}} >
                    <div className="playlist-list-box"></div>
                    <div className="playlist-list-box"></div>
                    <div className="playlist-list-box"></div>
                    <div className="playlist-list-box"></div>
                    <div className="playlist-list-box"></div>
                    <div className="playlist-list-box"></div>
                    <div className="playlist-list-box"></div>
                    <div className="playlist-list-box"></div>
                </Scrollbars> 
            </div>
        </>
    )
}

export default Playlist1 ;
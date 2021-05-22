import { useState, React } from 'react';
import Nav from './app-home-page-components/nav';
import './liked-page.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faHeart } from '@fortawesome/free-solid-svg-icons';
import { Scrollbars } from 'react-custom-scrollbars';

function LikedPage(){

    const [scrollWidth,setScrollWidth]=useState("36rem");
    if(window.innerWidth<700 && window.innerWidth>560 && scrollWidth!=="31rem"){
        setScrollWidth("31rem");
    }else if(window.innerWidth>700 && scrollWidth!=="36rem"){
        setScrollWidth("36rem");
    }else if(window.innerWidth<561 && scrollWidth!=="25rem"){
        setScrollWidth("25rem");
    }

    window.addEventListener("resize", handleResize);
    function handleResize(){
        if(window.innerWidth<700 && window.innerWidth>560 && scrollWidth!=="31rem"){
            setScrollWidth("31rem");
        }else if(window.innerWidth>700 && scrollWidth!=="36rem"){
            setScrollWidth("36rem");
        }else if(window.innerWidth<561 && scrollWidth!=="25rem"){
            setScrollWidth("25rem");
        }
    }

    return(
        <div className='liked-page'>
            <Nav />
            <div className="liked-head">
                <div className="liked-title">Liked Songs</div>
                <button className="clear-list-btn">Clear All</button>
            </div>
            <div className="liked-container">
                <Scrollbars style={{ width:scrollWidth, height: "30rem" }}>
                    <LikedBox/>
                    <LikedBox/>
                    <LikedBox/>
                    <LikedBox/>
                    <LikedBox/>
                    <LikedBox/>
                    <LikedBox/>
                </Scrollbars>
            </div>
        </div>
    )
}

const LikedBox = function(){
    return (
        <div className="L-result-box">
            <div className="L-cover-img">
                {/* <img src="" alt="img" /> */}
            </div>
            <div className="L-result-info">
                <div className="L-result-title"></div>
                <div className="L-result-artist-duration">
                    <div className="L-result-artist"></div>
                    <div className="L-result-duration"></div>
                </div>
            </div>
            <div className="L-result-options">
                <FontAwesomeIcon className="L-icons-option" icon={faPlus} aria-hidden="true" />
                <FontAwesomeIcon className="L-icons-option" icon={faHeart} aria-hidden="true" />
            </div>
        </div>
    );
}

export default LikedPage ;
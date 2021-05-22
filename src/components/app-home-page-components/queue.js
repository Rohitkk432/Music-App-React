import { useState, React } from 'react';
import './queue.css';
import { Scrollbars } from 'react-custom-scrollbars';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faHeart } from '@fortawesome/free-solid-svg-icons';

function Queue(){
    const [scrollWidth,setScrollWidth]=useState("27rem");
    if(window.innerWidth<510 && scrollWidth!=="21rem"){
        setScrollWidth("21rem");
    }else if(window.innerWidth>510 && scrollWidth!=="27rem"){
        setScrollWidth("27rem");}
    
    window.addEventListener("resize", handleResize);
    function handleResize(){
        if(window.innerWidth<510 && scrollWidth!=="21rem"){
            setScrollWidth("21rem");
        }else if(window.innerWidth>510 && scrollWidth!=="27rem"){
            setScrollWidth("27rem");}
    }
        
    return(
        <>
            <div className="queue">
                <div className="queue-title">Queue</div>
                <div className="list-of-queue">
                    <Scrollbars style={{ width:scrollWidth, height: "25rem" }}>
                        <QueueBox/>
                        <QueueBox/>
                        <QueueBox/>
                        <QueueBox/>
                        <QueueBox/>
                        <QueueBox/>
                        <QueueBox/>
                        <QueueBox/>
                    </Scrollbars>
                </div>
            </div>
        </>
    )
}

function QueueBox(){
    return(
        <div className="queue-list-box">
            <div className="Q-cover-img">
                {/* <img src="" alt="img" /> */}
            </div>
            <div className="Q-result-info">
                <div className="Q-result-title"></div>
                <div className="Q-result-artist-duration">
                    <div className="Q-result-artist"></div>
                    <div className="Q-result-duration"></div>
                </div>
            </div>
            <div className="Q-result-options">
                <FontAwesomeIcon className="Q-icons-option" icon={faPlus} aria-hidden="true" />
                <FontAwesomeIcon className="Q-icons-option" icon={faHeart} aria-hidden="true" />
            </div>
        </div>
    )
} 
export default Queue;
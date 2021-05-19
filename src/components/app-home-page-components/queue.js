import { useState, React } from 'react';
import './queue.css';
import { Scrollbars } from 'react-custom-scrollbars';

function Queue(){
    const [scrollWidth,setScrollWidth]=useState("27rem");
    if(window.innerWidth<500 && scrollWidth!=="21rem"){
        setScrollWidth("21rem");
    }else if(window.innerWidth>500 && scrollWidth!=="27rem"){
        setScrollWidth("27rem");}
    
    window.addEventListener("resize", handleResize);
    function handleResize(){
        if(window.innerWidth<500 && scrollWidth!=="21rem"){
            setScrollWidth("21rem");
        }else if(window.innerWidth>500 && scrollWidth!=="27rem"){
            setScrollWidth("27rem");}
    }
        
    return(
        <>
            <div className="queue">
                <div className="queue-title">Queue</div>
                <div className="list-of-queue">
                    <Scrollbars style={{ width:scrollWidth, height: "25rem" }}>
                        <div className="queue-list-box"></div>
                        <div className="queue-list-box"></div>
                        <div className="queue-list-box"></div>
                        <div className="queue-list-box"></div>
                        <div className="queue-list-box"></div>
                        <div className="queue-list-box"></div>
                        <div className="queue-list-box"></div>
                        <div className="queue-list-box"></div>
                        <div className="queue-list-box"></div>
                        <div className="queue-list-box"></div>
                    </Scrollbars>
                </div>
            </div>
        </>
    )
}

export default Queue;
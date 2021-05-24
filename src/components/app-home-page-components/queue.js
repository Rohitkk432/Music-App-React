import { useState, React } from 'react';
import './queue.css';
import { Scrollbars } from 'react-custom-scrollbars';
import {getFullQueue} from '../../methods';
import {currentId} from '../login_page_components/googlelogin';
import QueueBox from './queue-box';

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

    let fullQueue;
    getFullQueue(currentId)
        .then((res)=>{
            fullQueue=res;
            console.log(fullQueue);
        })
    
    return(
        <>
            <div className="queue">
                <div className="queue-title">Queue</div>
                <div className="list-of-queue">
                    <Scrollbars style={{ width:scrollWidth, height: "25rem" }}>
                        {fullQueue?.map((song, idx) => (
                            <QueueBox {...song} key={idx} />
                        ))}
                    </Scrollbars>
                </div>
            </div>
        </>
    )
}

export default Queue;
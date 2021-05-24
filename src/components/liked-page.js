import { useState, React } from 'react';
import Nav from './app-home-page-components/nav';
import './liked-page.css';
import { Scrollbars } from 'react-custom-scrollbars';
import {getFullLiked} from '../methods';
import {currentId} from './login_page_components/googlelogin';
import LikedBox from './liked-box';

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

    let fullLiked;
    getFullLiked(currentId)
        .then((res)=>{
            fullLiked=res;
        })

    return(
        <div className='liked-page'>
            <Nav />
            <div className="liked-head">
                <div className="liked-title">Liked Songs</div>
                <button className="clear-list-btn">Clear All</button>
            </div>
            <div className="liked-container">
                <Scrollbars style={{ width:scrollWidth, height: "30rem" }}>
                    {fullLiked?.map((song, idx) => (
                            <LikedBox {...song} key={idx} />
                        ))}
                </Scrollbars>
            </div>
        </div>
    )
}

export default LikedPage ;
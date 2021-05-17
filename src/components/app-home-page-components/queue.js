import React from 'react';
import './queue.css';
import { Scrollbars } from 'react-custom-scrollbars';

function Queue(){
    return(
        <>
            <div className="queue">
                <div className="queue-title">Queue</div>
                <div className="list-of-queue">
                    <Scrollbars style={{ width: "27rem", height: "25rem" }}>
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
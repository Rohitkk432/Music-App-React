import React from 'react';
import './queue.css';

function Queue(){
    return(
        <>
            <div className="queue">
                <div className="queue-title">Queue</div>
                <div className="list-of-queue">
                    <div className="queue-list-box"></div>
                    <div className="queue-list-box"></div>
                    <div className="queue-list-box"></div>
                    <div className="queue-list-box"></div>
                    <div className="queue-list-box"></div>
                    <div className="queue-list-box"></div>
                </div>
            </div>
        </>
    )
}

export default Queue;
import { React,useEffect } from 'react';
import './queue.css';
import { Scrollbars } from 'react-custom-scrollbars-2';
import QueueBox from './queue-box';
import {delQueue, getFullQueue} from '../../methods';

function Queue (params) {

    const [fullQueue, setFullQueue] = params.data;
    const [updater,setUpdater] = params.updateO;
    const [upd2, setUpd2] = params.upd;

    const currentId = localStorage.getItem('id');

    //to remove warnings
    if(fullQueue === 0){
        setFullQueue(fullQueue);
        if(false){
            setUpdater(updater);
        }
    }

    useEffect(()=>{
        console.log("queue.js");
        getFullQueue(currentId).then((list)=>{setFullQueue(list)});
    },[currentId,updater,setFullQueue]);

    return(
    <>
        <div className="queue">
            <div className="queue-title">
                    <div>Queue</div>
                    <button className="clear-list-btn-queue" onClick={(e)=>{
                        e.preventDefault();
                        delQueue(currentId);
                        setUpd2(upd2+1);
                    }}>Clear All</button>
                </div>
            <div className="list-of-queue">
                <Scrollbars style={{ width:"90%", height: "25rem" }}>
                    {fullQueue.map((song, idx) => (
                        <QueueBox upd={[upd2,setUpd2]} data={[fullQueue, setFullQueue]} {...song} key={idx} />
                    ))}
                </Scrollbars>
            </div>
        </div>
    </>
)
}
export default Queue;
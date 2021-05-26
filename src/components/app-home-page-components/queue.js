import { React, Component } from 'react';
import './queue.css';
import { Scrollbars } from 'react-custom-scrollbars';
import QueueBox from './queue-box';
import {currentId} from '../login_page_components/googlelogin';
import {delQueue} from '../../methods';

class Queue extends Component{

    render(){
        return(
        <>
            <div className="queue">
                <div className="queue-title">
                        <div>Queue</div>
                        <button className="clear-list-btn-queue" onClick={(e)=>{
                            e.preventDefault();
                            delQueue(currentId);
                        }}>Clear All</button>
                    </div>
                <div className="list-of-queue">
                    <Scrollbars style={{ width:"90%", height: "25rem" }}>
                        {this.props.data.fullQueue.map((song, idx) => (
                            <QueueBox {...song} key={idx} />
                        ))}
                    </Scrollbars>
                </div>
            </div>
        </>
    )
    }
}
export default Queue;
import { React, Component } from 'react';
import './queue.css';
import { Scrollbars } from 'react-custom-scrollbars';
// import {getFullQueue} from '../../methods';
import {currentId} from '../login_page_components/googlelogin';
import QueueBox from './queue-box';

class Queue extends Component{
    constructor(){
        super();
        this.state = { fullQueue: [] };
        
    }
    async componentDidMount() {

        await fetch(`http://localhost:5000/queue/${currentId}`)
        .then((res)=> res.json())
        .then((queueList)=>{
            console.log("rohit");
            this.setState({fullQueue:queueList})
        })
        .catch((err)=>console.log(err));

        // getFullQueue(currentId)
        // .then((res)=>{
        //     this.setState({fullQueue:res})
        //     // fullQueue=res;
        //     // console.log(this.state.fullQueue);
        //     console.log("hi");
        // });
    
    }

    // let fullQueue = null;

    // getFullQueue(currentId)
    //     .then((res)=>{
    //         fullQueue=res;
    //         console.log(fullQueue);
    //     });

    render(){
        return(
        <>
            <div className="queue">
                <div className="queue-title">Queue</div>
                <div className="list-of-queue">
                    <Scrollbars style={{ width:"90%", height: "25rem" }}>
                        {this.state.fullQueue.map((song, idx) => (
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
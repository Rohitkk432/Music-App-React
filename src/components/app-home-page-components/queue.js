import { React, Component } from 'react';
import './queue.css';
import { Scrollbars } from 'react-custom-scrollbars';
import {getFullQueue} from '../../methods';
import {currentId} from '../login_page_components/googlelogin';
import QueueBox from './queue-box';
// import { render } from '@testing-library/react';

class Queue extends Component{
// function Queue(){
    constructor(){
        super();
        this.state = { fullQueue: [] };
        
    }

    // const [scrollWidth,setScrollWidth]=useState("27rem");
    // if(window.innerWidth<510 && scrollWidth!=="21rem"){
    //     setScrollWidth("21rem");
    // }else if(window.innerWidth>510 && scrollWidth!=="27rem"){
    //     setScrollWidth("27rem");}
    
    // window.addEventListener("resize", handleResize);
    // function handleResize(){
    //     if(window.innerWidth<510 && scrollWidth!=="21rem"){
    //         setScrollWidth("21rem");
    //     }else if(window.innerWidth>510 && scrollWidth!=="27rem"){
    //         setScrollWidth("27rem");}
    // };
    async componentDidMount() {

        await fetch(`http://localhost:5000/queue/${currentId}`)
        .then((res)=> res.json())
        .then((queueList)=>{
            console.log("rohit");
            // return queueList;
            this.setState({fullQueue:queueList})
        })
        .catch((err)=>console.log(err));
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
                    <Scrollbars style={{ width:"33rem", height: "25rem" }}>
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
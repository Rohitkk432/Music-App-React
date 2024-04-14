import React from 'react';
import './loginposter.css';
import poster from '../../images/Music-Pro-X-poster.png';
import component1 from '../../images/Poster-component1.png';
import component2 from '../../images/Poster-component2.png';
import component3 from '../../images/Poster-component3.png';
import component4 from '../../images/Poster-component4.png';
import component5 from '../../images/Poster-component5.png';
import component6 from '../../images/Poster-component6.png';

function LoginPoster (){
    return (
        <>
            <div className="poster-container">
                <div className="poster-side">
                    <img src={component1} alt="1" className="postercomponent component1" />
                    <img src={component2} alt="2" className="postercomponent component2" />
                    <img src={component3} alt="3" className="postercomponent component3" />
                </div>
                <img className="main-poster" src={poster} alt="poster" />
                <div className="poster-side">
                    <img src={component4} alt="4" className="postercomponent component4" />
                    <img src={component5} alt="5" className="postercomponent component5" />
                    <img src={component6} alt="6" className="postercomponent component6" />
                </div>
            </div>
        </>
    )
}

export default LoginPoster ;
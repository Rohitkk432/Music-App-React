import React from 'react';
import './loginposter.css';
import poster from '../../images/Poster Music-app.png';

function LoginPoster (){
    return (
        <>
            <div className="poster-container">
                <img className="poster-side" src={poster} alt="poster" />
            </div>
        </>
    )
}

export default LoginPoster ;
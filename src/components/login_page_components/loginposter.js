import React from 'react';
import './loginposter.css';
import poster from '../../images/Poster Music-app.png';

function LoginPoster (){
    return (
        <>
            <img className="poster-side" src={poster} alt="poster" />
        </>
    )
}

export default LoginPoster ;
import React from 'react';
// import {Link} from 'react-router-dom';
import Nav from './app-home-page-components/nav';
import MusicUI from './app-home-page-components/musicUi';

function AppHomePage(){
    return(
        <>
            <div className='app-home-page'>
                <Nav />
                <MusicUI /> 
            </div>
        </>
    )
}

export default AppHomePage ;
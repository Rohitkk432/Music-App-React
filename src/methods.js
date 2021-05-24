// import React from 'react';

//User methods
//checking if user exists
const checkExistingUser = async function(email){
    const response = await fetch(`http://localhost:5000/users/${email}`,{ method: "GET"})
        .then((res)=>res.json())
        .then((user)=>{
            return user;
        })
        .catch((err)=>console.log(err));
    return response;
}

//register new user
const registerNewUser = async function(email){
    const newReg = await fetch('http://localhost:5000/users',{
            method:"POST",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify({"email":`${email}`})
        })
        .then((res)=>res.json())
        .then((user)=>{
            return user;
        })
        .catch((err)=>console.log(err));
    return newReg;
}

//=================================================================================================//
// check add methods

async function checkAddSongInQueue(user_id,song_id){
    checkSongInQueue(user_id,song_id)
    .then((res)=>{
        if(!res){
            addSongInQueue(user_id,song_id);
        }
    })
}

async function checkAddSongInLiked(user_id,song_id){
    checkSongInLiked(user_id,song_id)
    .then((res)=>{
        if(!res){
            addSongInLiked(user_id,song_id);
        }
    })
}

async function checkAddSongInPlaylist(user_id,song_id,playlist_number){
    checkSongInPlaylist(user_id,song_id,playlist_number)
    .then((res)=>{
        if(!res){
            addSongInPlaylist(user_id,song_id,playlist_number);
        }
    })
}

//=================================================================================================//

//Songs method (will hardly use as there already exits json file)
//getting all songs
const getAllSongs = async function(){
    const response = await fetch(`http://localhost:5000/songs`)
        .then((res)=>res.json())
        .then((songsList)=>{
            return songsList;
        })
        .catch((err)=>console.log(err));
    return response;
}

//=================================================================================================//

//Queue Methods
//getting full queue of a user
const getFullQueue = async function(user_id){
    console.log("bye");
    const response = await fetch(`http://localhost:5000/queue/${user_id}`)
        .then((res)=> res.json())
        .then((queueList)=>{
            console.log("rohit");
            return queueList;
        })
        .catch((err)=>console.log(err));
    return response;
}

//findings if a particular song exists in users queue
const checkSongInQueue = async function(user_id,song_id){
    const response = await fetch(`http://localhost:5000/queue/${user_id}/${song_id}`,{
            method:"GET",
        })
        .then((res)=>res.json())
        .then((song)=>{
            return song;
        })
        .catch((err)=>console.log(err));
    return response;
}

//adding a song to queue
const addSongInQueue = async function(user_id,song_id){
    const response = await fetch('http://localhost:5000/queue',{
            method:"POST",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify({"user_id":`${user_id}`,"song_id":`${song_id}`})
        })
        .then((res)=>res.json())
        .then((song)=>{
            return song;
        })
        .catch((err)=>console.log(err));
    return response;
}

//deleting single specific song from queue
const delSongInQueue = async function(user_id,song_id){
    const response = await fetch('http://localhost:5000/queue',{
            method:"DELETE",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify({"user_id":`${user_id}`,"song_id":`${song_id}`})
        })
        .then((res)=>res.json())
        .then((song)=>{
            return song;
        })
        .catch((err)=>console.log(err));
    return response;
}

//deleting entire queue
const delQueue = async function(user_id){
    const response = await fetch(`http://localhost:5000/queue/${user_id}`,{
            method:"DELETE",
        })
        .then((res)=>res.json())
        .then((listQueue)=>{
            return listQueue;
        })
        .catch((err)=>console.log(err));
    return response;
}

//=================================================================================================//

//liked methods
//getting full liked list of a user
const getFullLiked = async function(user_id){
    const response = await fetch(`http://localhost:5000/liked/${user_id}`)
        .then((res)=>res.json())
        .then((likedList)=>{
            return likedList;
        })
        .catch((err)=>console.log(err));
    return response;
}

//findings if a particular song exists in users liked
const checkSongInLiked = async function(user_id,song_id){
    const response = await fetch(`http://localhost:5000/liked/${user_id}/${song_id}`,{
            method:"GET",
        })
        .then((res)=>res.json())
        .then((song)=>{
            return song;
        })
        .catch((err)=>console.log(err));
    return response;
}

//adding a song to liked
const addSongInLiked = async function(user_id,song_id){
    const response = await fetch('http://localhost:5000/liked',{
            method:"POST",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify({"user_id":`${user_id}`,"song_id":`${song_id}`})
        })
        .then((res)=>res.json())
        .then((song)=>{
            return song;
        })
        .catch((err)=>console.log(err));
    return response;
}

//deleting single specific song from liked
const delSongInLiked = async function(user_id,song_id){
    const response = await fetch('http://localhost:5000/liked',{
            method:"DELETE",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify({"user_id":`${user_id}`,"song_id":`${song_id}`})
        })
        .then((res)=>res.json())
        .then((song)=>{
            return song;
        })
        .catch((err)=>console.log(err));
    return response;
}

//deleting entire liked
const delLiked = async function(user_id){
    const response = await fetch(`http://localhost:5000/liked/${user_id}`,{
            method:"DELETE",
        })
        .then((res)=>res.json())
        .then((listLiked)=>{
            return listLiked;
        })
        .catch((err)=>console.log(err));
    return response;
}

//=================================================================================================//

// playlist methods
//getting full specific playlist of a user
const getFullPlaylist = async function(user_id,playlist_number){
    const response = await fetch(`http://localhost:5000/playlist/${user_id}/${playlist_number}`,{
            method:"GET",
        })
        .then((res)=>res.json())
        .then((playlist)=>{
            return playlist;
        })
        .catch((err)=>console.log(err));
    return response;
}

//checking specific song in a specific playlist of a user
const checkSongInPlaylist = async function(user_id,song_id,playlist_number){
    const response = await fetch(`http://localhost:5000/playlist/${user_id}/${song_id}/${playlist_number}`,{
            method:"GET",
        })
        .then((res)=>res.json())
        .then((song)=>{
            return song;
        })
        .catch((err)=>console.log(err));
    return response;
}

//posting a song to a specific playlist of a user
const addSongInPlaylist = async function(user_id,song_id,playlist_number){
    const response = await fetch('http://localhost:5000/playlist',{
            method:"POST",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify({"user_id":`${user_id}`,"song_id":`${song_id}` , "playlist_number":`${playlist_number}`})
        })
        .then((res)=>res.json())
        .then((song)=>{
            return song;
        })
        .catch((err)=>console.log(err));
    return response;
}

//deleting single specific song from a specific playlist
const delSongInPlaylist = async function(user_id,song_id,playlist_number){
    const response = await fetch('http://localhost:5000/playlist',{
            method:"DELETE",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify({"user_id":`${user_id}`,"song_id":`${song_id}` , "playlist_number":`${playlist_number}`})
        })
        .then((res)=>res.json())
        .then((song)=>{
            return song;
        })
        .catch((err)=>console.log(err));
    return response;
}

//deleting entire specific playlist
const delPlaylist = async function(user_id,playlist_number){
    const response = await fetch('http://localhost:5000/playlist/full',{
            method:"DELETE",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify({"user_id":`${user_id}`,"playlist_number":`${playlist_number}`})
        })
        .then((res)=>res.json())
        .then((playlist)=>{
            return playlist;
        })
        .catch((err)=>console.log(err));
    return response;
}

//=================================================================================================//

export {checkExistingUser , registerNewUser , getAllSongs , getFullQueue , checkSongInQueue , addSongInQueue , delSongInQueue , delQueue , getFullLiked , checkSongInLiked , addSongInLiked , delSongInLiked , delLiked , getFullPlaylist , checkSongInPlaylist , addSongInPlaylist , delSongInPlaylist , delPlaylist , checkAddSongInLiked , checkAddSongInQueue , checkAddSongInPlaylist };
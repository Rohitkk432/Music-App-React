import {React,useState,useMemo} from 'react';
import './songSearch.css';
import { Scrollbars } from 'react-custom-scrollbars';
import songsList from "../../songinfo.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faPlus, faHeart } from '@fortawesome/free-solid-svg-icons';

function SongSearch(){

    const [scrollWidth,setScrollWidth]=useState("37rem");
    if(window.innerWidth<870 && window.innerWidth>520 && scrollWidth!=="25rem"){
        setScrollWidth("25rem");
    }else if(window.innerWidth>870&& scrollWidth!=="37rem"){
        setScrollWidth("37rem");}
    else if(window.innerWidth<520 && scrollWidth!=="18.5rem"){
        setScrollWidth("18.5rem");}
    
    window.addEventListener("resize", handleResize);
    function handleResize(){
        if(window.innerWidth<870 && window.innerWidth>520 && scrollWidth!=="25rem"){
            setScrollWidth("25rem");
        }else if(window.innerWidth>870 && scrollWidth!=="37rem"){
            setScrollWidth("37rem");}
        else if(window.innerWidth<520 && scrollWidth!=="18.5rem"){
            setScrollWidth("18.5rem");}
    }

    const [search, setSearch] = useState("");

    const songs = useMemo(() => {
        if (!search) return songsList;

        return songsList.filter((_song) => {
            return (
                _song.title.toLowerCase().includes(search.toLowerCase()) ||
                _song.singer.toLowerCase().includes(search.toLowerCase())
            );
        });
    }, [search]);

    return(
        <div className="search-container">
            <div className="searchbar">
                <FontAwesomeIcon className="search-icon" icon={faSearch} aria-hidden="true" />
                <input 
                type="text" 
                placeholder="Search"
                className="search-bar"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            
            <div className="result-container">
                <Scrollbars style={{ width:scrollWidth, height: "21rem" }}>
                    {songs.map((song, idx) => (
                        <SearchResult {...song} key={idx} />
                    ))}
                </Scrollbars>
            </div>
        </div>
    );
}

export default SongSearch;

const SearchResult = function({title,singer,imgpath,duration}){
    return (
        <div className="result-box">
            <div className="cover-img">
                <img src={imgpath} alt="img" />
            </div>
            <div className="result-info">
                <div className="result-title">{title}</div>
                <div className="result-artist-duration">
                    <div className="result-artist">{singer}</div>
                    <div className="result-duration">{duration}</div>
                </div>
            </div>
            <div className="result-options">
                <FontAwesomeIcon className="icons-option" icon={faPlus} aria-hidden="true" />
                <FontAwesomeIcon className="icons-option" icon={faHeart} aria-hidden="true" />
            </div>
        </div>
    );
}
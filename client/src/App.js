import './App.css';
import LoginPage from './components/loginpage';
import AppHomePage from './components/app-home-page';
import PlaylistPage from './components/playlist-page';
import LikedPage from './components/liked-page';
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className='app'>
        <Routes>
          <Route path='/' exact element={<LoginPage/>} />
          <Route path='/home' element={<AppHomePage/>} />
          <Route path='/playlist/*' element={<PlaylistPage/>} />
          <Route path='/liked' element={<LikedPage/>} />
        </Routes>
      </div>
    </Router>    
  );
}

export default App;

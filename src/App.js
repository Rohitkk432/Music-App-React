import './App.css';
import LoginPage from './components/loginpage';
import AppHomePage from './components/app-home-page';
import PlaylistPage from './components/playlist-page';
import {BrowserRouter as Router , Switch , Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className='app'>
        <Switch>
          <Route path='/' exact component={LoginPage} />
          <Route path='/home' component={AppHomePage} />
          <Route path='/playlist' component={PlaylistPage} />
        </Switch>
      </div>
    </Router>    
  );
}

export default App;

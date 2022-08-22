import { Route, Switch } from 'react-router-dom';
import { useState } from 'react';

import MoviesApi from '../../utils/MoviesApi.js'
// import './App.css';

import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Navigation from '../Navigation/Navigation';
import PageNotFound from '../PageNotFound/PageNotFound';


function App() {
  const [films, setFilms] = useState([]);

  function handleGetMovies() {
    MoviesApi.getMovies()
    .then((data)=> {
      console.log('data get movies', data);
      setFilms(
        data.map((data) => ({
          name: data.nameRU,
          src: `https://api.nomoreparties.co${data.image.url}`,
          time: data.duration,
          id: data.id,
        }))
      )
      console.log('films ', films);
    })
    .catch((err) => {
      console.log(err);
    });
  }
 
  return (
    <body> 
      <div className="page"> 
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <Route path="/movies">
            <Movies
              onSearchFormClick={handleGetMovies}
              films={films}
            />
          </Route>
          <Route path="/saved-movies">
            <SavedMovies />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/signup">
            <Register />
          </Route>
          <Route path="/signin">
            <Login />
          </Route>
          <Route path="/navigation">
            <Navigation />
          </Route>
          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
      </div>
    </body>
  );
}

export default App;
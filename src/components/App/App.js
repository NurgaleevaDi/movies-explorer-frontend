import { Route, Switch } from 'react-router-dom';
import { useState } from 'react';

import MoviesApi from '../../utils/MoviesApi.js'

import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Navigation from '../Navigation/Navigation';
import PageNotFound from '../PageNotFound/PageNotFound';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.js';

import * as auth from "../../utils/auth.js"


function App() {
  const [films, setFilms] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [searchFilms, setSearchFilms] = useState([]);
  // const [searchLongFilms, setSearchLongFilms] = useState([]);
  const [fullFilm, setFullFilm] = useState([]);
  const [checkedBox, setCheckedBox] = useState(false);

  const [loggedIn, setLoggedIn] = useState(false);

  function handleRegister(email, password, name) {
    return auth
      .register(email, password, name)
      .then(() => {
        console.log('Register ok')
      })
      .catch((err) => {
        console.log(err);
      });
  }

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
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function handleSearchInputChange(input) {
    setSearchInput(input); 
  } 

  function handleChangeCheckbox(checked) {
    setCheckedBox(checked);
    handleShortsFilm();
  }
  // функция отбора фильмов по названию
  function handleFilmSearch() {
    setSearchFilms(films.filter(function(e) {
      return e.name.includes(searchInput);
        })
    )
  }
  function handleShortsFilm() {
    console.log('shorts');
    if (!checkedBox) {
      setFullFilm(searchFilms.filter(function(e) {
        return e.duration < 40;
      }))
    }
    console.log('full', fullFilm);
  }
  
 
  return (
    <body> 
      <div className="page"> 
        <Switch>
          <ProtectedRoute exact path="/" loggedIn={loggedIn}>
            <Main />
          </ProtectedRoute>
          <Route path="/movies">
            <Movies
              onSearchFormClick={handleGetMovies}
              films={films}
              searchFilms={searchFilms}
              onChange={handleSearchInputChange}
              onSubmit={handleFilmSearch}
              onChecked={handleChangeCheckbox}
            />
          </Route>
          <Route path="/saved-movies">
            <SavedMovies />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/signup">
            <Register
              handleRegister={handleRegister}
            />
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
import { Route, Switch, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';

import MoviesApi from '../../utils/MoviesApi.js'

import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Navigation from '../Navigation/Navigation';
import PageNotFound from '../PageNotFound/PageNotFound';
//import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.js';

import * as auth from "../../utils/auth.js"
import mainApi from '../../utils/MainApi.js';
import { CurrentUserContext } from '../../context/CurrentUserContext.js';


function App() {
  const history = useHistory();
  const [films, setFilms] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [searchFilms, setSearchFilms] = useState([]);
  // const [searchLongFilms, setSearchLongFilms] = useState([]);
  const [fullFilm, setFullFilm] = useState([]);
  const [checkedBox, setCheckedBox] = useState(false);

  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [errorLogin, setErrorLogin] = useState('');
  const [errorRegister, setErrorRegister] = useState('');

  function handleRegister(email, password, name) {
    return auth
      .register(email, password, name)
      .then((res) => {
        console.log(res);
        // if (res.status === 409) {
        //   console.log('res'res);
        //   setErrorRegister('Пользователь с таким email уже существует.')
        // }
        // setStatusMessage("Вы успешно зарегистрировались!");
        // setStatusImg(true);
        // history.push("/sign-in");
        history.push("/movies");
      })
      .catch((err) => {
        setErrorRegister(err.message);
        // console.log(err);
      });
  }
  function handleLogin(email, password) {
    return auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          tokenCheck();
          history.push("/movies");
        }
      })
      .catch((err) => {
        setErrorLogin(err.message);
        // setStatusOpenPopup(true);
        // setStatusMessage("Что-то пошло не так! Попробуйте еще раз.");
      })
  }
  function tokenCheck() {
    if (localStorage.getItem('jwt')) {
      let jwt = localStorage.getItem('jwt');
      auth
        .getContent(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
          }
        })
        .catch((err) => {
          console.log(err);
        })
    };
  }

  function handleSignOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    history.push('/signin');
  }

  function handleUpdateUser(currentUser) {
    const token = localStorage.getItem('jwt');
    console.log('currentUser ',currentUser)
    mainApi.profileEdit(currentUser, token)
   
      .then((data) => {
        
        setCurrentUser(data.data);
        console.log('data Update ', data);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  useEffect(() => {
    tokenCheck();
  }, []); //уточнить для чего

  useEffect(() => {
    if(loggedIn) {
      history.push("/");
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      const token = localStorage.getItem('jwt');
      mainApi.getUserData(token)
        .then((data) => {
          setCurrentUser(data);
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }, [loggedIn]);















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
    <CurrentUserContext.Provider value={currentUser}>
      <body> 
        <div className="page"> 
          <Switch>
            <Route exact path="/" loggedIn={loggedIn}>
              <Main
                loggedIn={loggedIn}
                handleSignOut={handleSignOut}
              />
            </Route>
            <Route path="/movies">
              <Movies
                onSearchFormClick={handleGetMovies}
                films={films}
                searchFilms={searchFilms}
                onChange={handleSearchInputChange}
                onSubmit={handleFilmSearch}
                onChecked={handleChangeCheckbox}
                loggedIn={loggedIn}
              />
            </Route>
            <Route path="/saved-movies">
              <SavedMovies />
            </Route>
            <Route path="/profile">
              <Profile
                handleSignOut={handleSignOut}
                onUpdateUser={handleUpdateUser}
              />
            </Route>
            <Route path="/signup">
              <Register
                handleRegister={handleRegister}
                errorRegister={errorRegister}
              />
            </Route>
            <Route path="/signin">
              <Login
                handleLogin={handleLogin}
                errorLogin={errorLogin}
              />
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
    </CurrentUserContext.Provider>
  );
}

export default App;
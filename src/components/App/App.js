import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { CurrentUserContext } from '../../context/CurrentUserContext.js';

import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Navigation from '../Navigation/Navigation';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import * as auth from '../../utils/auth.js';
import mainApi from '../../utils/MainApi';

function App() {
  const [loggedIn, setLoggedIn] = useState(undefined);
  const [errorRegister, setErrorRegister] = useState('');
  const [errorLogin, setErrorLogin] = useState('');
  const [currentUser, setCurrentUser] = useState('');
  const [statusProfile, setStatusProfile] = useState('');
  const history = useHistory();

  //Регистрация
  function handleRegister(email, password, name) {
    return auth
      .register(email, password, name)
      .then((res) => {
        setLoggedIn(true);
        setCurrentUser(res);
        handleLogin(email, password);
        history.push("/movies");
      })
      .catch((err) => {
        setErrorRegister(err.message);
        console.log(err);
      });
  }

  //Авторизация
  function handleLogin(email, password) {
    return auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          tokenCheck();
          getUserData();
        }
      })
      .catch((err) => {
        setErrorLogin(err.message);
      })
  }

  //Проверка токена
  function tokenCheck() {
    if (localStorage.getItem('jwt')) {
      let jwt = localStorage.getItem('jwt');
      auth
        .getContent(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            history.push('/movies');
          }
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }

  //Получение данных пользователя после успешной авторизации и сохранение их в currentUser
  function getUserData() {
    const token=localStorage.getItem('jwt');
    mainApi.getUserData(token)
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => console.log(err));
  }

  //Выход
  function handleSignOut() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('keyWord');
    localStorage.removeItem('isShorts');
    localStorage.removeItem('filteredMovies');
    setLoggedIn(false);
    history.push('/signin');
  }

  //Редактирование профиля пользователя
  function handleUserUpdate(currentUser) {
    const token = localStorage.getItem('jwt');
    mainApi.profileEdit(currentUser, token)
      .then((data) => {
        setCurrentUser(data.data);
        setStatusProfile('Информация обновлена!');
      })
      .catch((err) => {
        console.log(err);
        setStatusProfile(err.message);
      })
      .finally(setStatusProfile(''));
  }
  
  useEffect(() => {
    getUserData();
  }, [loggedIn]);

  useEffect(() => {
    tokenCheck();
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <body> 
      <div className="page"> 
        <Switch>
          <Route exact path="/">
            <Main
              loggedIn={loggedIn} 
            />
          </Route>
          <ProtectedRoute path="/movies" loggedIn={loggedIn}>
            <Movies
              loggedIn={loggedIn}
            />
          </ProtectedRoute>
          <ProtectedRoute path="/saved-movies" loggedIn={loggedIn}>
            <SavedMovies
              loggedIn={loggedIn} 
            />
          </ProtectedRoute>
          <ProtectedRoute path="/profile" loggedIn={loggedIn}>
            <Profile
              loggedIn={loggedIn}
              handleSignOut={handleSignOut}
              handleUserUpdate={handleUserUpdate}
              statusProfile={statusProfile}
            />
          </ProtectedRoute>
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
          {/* используем Redirect Если пользователь посетит / 
          или любой другой маршрут, который не определён в приложении,
          неавторизованные пользователи будут перенаправлены на /signin*/}
          <Route exact path="/"> 
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
          </Route>
        </Switch>
      </div>
    </body>
    </CurrentUserContext.Provider>
  );
}

export default App;
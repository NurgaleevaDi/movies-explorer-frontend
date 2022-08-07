import { Route, Switch } from 'react-router-dom';
// import './App.css';

import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Header from '../Header/Header';


const iconMenu = document.querySelector('.header__menu-icon');
console.log(iconMenu);
if (iconMenu) {
    const menuBody = document.querySelector('.header__menu-body');
    iconMenu.addEventListener('click', function(){
        iconMenu.classList.toggle('_active');
        menuBody.classList.toggle('_active');
    })  
}
function App() {
  return (
    <body> 
      <div className="page"> 
        <Switch>
          <Route exact path="/">
            <Header
              link="/signup"
              name="Войти"
              nameLink="Регистрация"
            />
            <Main />
          </Route>
          <Route path="/movies">
            <Movies />
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
        </Switch>
      </div>
    </body>
  );
}

export default App;
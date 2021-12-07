 import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
 import logo from "../images/logo.svg"
  
  const Header = ({email, onLogOut}) => {
    return (
      <header className="header">
        <img className="header__logo" src={logo} alt="Лого"/>
        <Switch>
          <Route exact path="/">
            <div className="header__nav">
            <p className="header__email">{email}</p>
            <Link className="header__link" to="/sign-in" onClick={onLogOut}>
              Выйти
            </Link>
            </div>
          </Route>
          <Route exact path="/sign-in">
            <Link className="header__link" to="/sign-up">
              Регистрация
            </Link>
          </Route>
          <Route exact path="/sign-up">
            <Link className="header__link" to="/sign-in">
              Войти
            </Link>
          </Route>
        </Switch>
      </header>
    );
  }
  
  export default Header;
  

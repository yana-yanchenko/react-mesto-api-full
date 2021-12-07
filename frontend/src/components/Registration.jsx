import React from 'react';
import { Link } from 'react-router-dom';

const Registration = ({onSubmit}) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleChangeEmail = (evt) => {
    setEmail(evt.target.value)
  }
  const handleChangePassword = (evt) => {
    setPassword(evt.target.value)
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    onSubmit(email, password)
  }

  return (
    <section className="authentication">
      <form className="authentication__form" onSubmit={handleSubmit}>
        <div className="authentication__inputs">
        <h1 className="authentication__title">Регистрация</h1>
          <input type="email" value={email} onChange={handleChangeEmail} className="authentication__input" placeholder="Email"/>
          <input type="password" value={password} onChange={handleChangePassword} className="authentication__input" placeholder="Пароль"/>
        </div>
        <div className="authentication__access">
          <button className="authentication__button">Зарегистрироваться</button>
          <Link className="authentication__link-access" to="/sign-in">Уже зарегистрированы? Войти</Link>
        </div>
      </form>
    </section>
  );
}

export default Registration;

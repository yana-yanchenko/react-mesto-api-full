import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../context/CurrentUserContext";

const Main = (props) => {
  const currentUser = React.useContext(CurrentUserContext);

  
  return (
    <main className="main">
      <div className="profile">
        <div className="profile__box-avatar" onClick={props.onEditAvatar}>
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt="фото пользователя"
          />
          <div className="profile__lens-avatar"></div>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            className="profile__button-edit"
            type="button"
            onClick={props.onEditProfile}
          />
          <p className="profile__occupation">{currentUser.about}</p>
        </div>
        <button
          className="profile__button-add"
          type="button"
          onClick={props.onAddPlace}
        />
      </div>
      <section className="elements">
        {props.cards.map((card) => (
          <Card
            card={card}
            key={card._id}
            isLiked={card.likes.some((i)=> i === currentUser._id)}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />
        ))}
      </section>
    </main>
  );
};

export default Main;

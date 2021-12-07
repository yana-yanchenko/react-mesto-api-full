import React from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";

const Card = ({ card, onCardClick, onCardLike, onCardDelete }) => {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner === currentUser._id;
  const cardDeleteButtonClassName = `element__button-delete ${
    isOwn
      ? "element__button-delete_type_visible"
      : "element__button-delete_type_hidden"
  }`;
  
  const isLiked = card.likes.some((i)=> i === currentUser._id);
  console.log(isLiked);
  const cardLikeButtonClassName = `element__button-like ${
    isLiked ? "element__button-like_active" : ""
  }`;

  function handleDeleteClick() {
    onCardDelete(card);
  }

  function handleClick() {
    onCardClick(card);
  }
  function handleLikeClick() {
    onCardLike(card);
  }

  return (
    <div className="element">
      <button
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
      ></button>
      <img
        className="element__image"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <div className="element__description">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like">
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={handleLikeClick}
          ></button>
          <p className="element__count-like">{card.likes.length}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;

import React from "react";
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = (props) => {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("")

  const changeName = (evt) => {
    setName(evt.target.value);
  };
  const changeLink = (evt) => {
    setLink(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.onAddPlace({
      name,
      link
    });
    setName('')
    setLink('')
  } 

  return (
    <PopupWithForm
      name="card"
      title="Новое место"
      textButton="Создать"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_value_title"
        name="name"
        id="card-title"
        type="text"
        minLength="2"
        maxLength="30"
        placeholder="Название"
        value={name || ''}
        onChange={changeName}
        required
      />
      <span className="popup__input-error" id="card-title-error"></span>
      <input
        className="popup__input popup__input_value_link"
        name="link"
        id="card-link"
        type="url"
        placeholder="Ссылка на картинку"
        value={link || ''}
        onChange={changeLink}
        required
      />
      <span className="popup__input-error" id="card-link-error"></span>
    </PopupWithForm>
  );
};

export default AddPlacePopup;

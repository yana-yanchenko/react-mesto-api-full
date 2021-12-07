import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../context/CurrentUserContext";

const EditProfilePopup = (props) => {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);

  const onChangeName = (evt) => {
    setName(evt.target.value);
  };
  const onChangeDescription = (evt) => {
    setDescription(evt.target.value);
  };

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateUser({
      name:  name,
      about: description,
    });
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      textButton="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_value_name"
        name="name"
        type="text"
        id="profile-name"
        minLength="2"
        maxLength="40"
        value={name || " "}
        onChange={onChangeName}
        required
      />
      <span className="popup__input-error " id="profile-name-error"></span>
      <input
        className="popup__input popup__input_value_occupation"
        name="occupation"
        id="profile-occupation"
        type="text"
        minLength="2"
        maxLength="200"
        value={description || ""}
        onChange={onChangeDescription}
        required
      />
      <span className="popup__input-error" id="profile-occupation-error"></span>
    </PopupWithForm>
  );
};

export default EditProfilePopup;

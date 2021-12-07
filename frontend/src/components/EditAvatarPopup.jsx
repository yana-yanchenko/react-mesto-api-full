import React from "react";
import PopupWithForm from "./PopupWithForm";

const EditAvatarPopup = (props) => {
   const avatarInput = React.useRef(); 
   function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarInput.current.value,
    });
  } 

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      textButton="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        ref={avatarInput}
        className="popup__input popup__input_value_avatar"
        name="avatar"
        id="avatar"
        type="url"
        placeholder="Ссылка"
        defaultValue=""
        required
      />
      <span className="popup__input-error" id="avatar-error"></span>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;

import React from 'react';

const PopupWithForm = (props) => {
React.useEffect(()=>{
  
  const handleEscapeClosePopup = (evt) =>{
    if (evt.key === 'Escape'){
      props.onClose()
    }
  }
  props.isOpen && window.addEventListener('keydown', handleEscapeClosePopup)
  return () => {
    window.removeEventListener('keydown', handleEscapeClosePopup)
  }
},[props])
  const popusFormClassName = `popup popup_type_${props.name} ${ props.isOpen ? 'popup_opened' : '' }`;
  return (
      <div className={popusFormClassName} onClick={props.onClose}>
      <div className="popup__conteiner" onClick={(evt) =>{evt.stopPropagation()}}>
        <h2 className="popup__title">{props.title}</h2>
        <form className={`popup__form popup__form_${props.name}`} name={props.name} onSubmit={props.onSubmit}>
          {props.children}
          <button className="popup__button-save" type="submit" name="save" aria-label="Сохранить">{props.textButton}</button>
        </form>
        <button className="popup__button-close" type="button" name="close" aria-label="закрыть" onClick={props.onClose}/>
      </div>
    </div>
  );
}

export default PopupWithForm;

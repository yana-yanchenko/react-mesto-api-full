import React from 'react';
import errorImage from '../images/error.svg';
import okImage from '../images/ok.svg'
const InfoTooltip = (props) => {
    const popusFormClassName = `popup popup_type_tooltip ${ props.isInfoTooltip.isOpen ? 'popup_opened' : '' }`;
  return (
      <div className={popusFormClassName} onClick={props.onClose}>
      <div className="popup__conteiner popup__conteiner_type_tooltip" onClick={(evt) =>{evt.stopPropagation()}}>
        <button onClick={props.onClose} className="popup__button-close popup__button-close_type_tooltip" type="button" name="close" aria-label="закрыть"/>
        <img src={props.isInfoTooltip.error ? errorImage : okImage} alt="tooltip" className="popup__tooltip-image"/>
        <p className="popup__tooltip-text">{props.isInfoTooltip.error ? 'Что-то пошло не так! Попробуйте ещё раз.' : 'Вы успешно зарегистрировались!'}</p>
      </div>
    </div>
  );
}

export default InfoTooltip;

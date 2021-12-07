import React from 'react';

const ImagePopup = ({card, onClose}) => {
  React.useEffect(()=>{
  
    const handleEscapeClosePopup = (evt) =>{
      if (evt.key === 'Escape'){
        onClose()
      }
    }
    card && window.addEventListener('keydown', handleEscapeClosePopup)
    return () => {
      window.removeEventListener('keydown', handleEscapeClosePopup)
    }
  })

  return (
      <div className={`popup popup_type_photo ${card ? 'popup_opened' : "" } `} onClick={onClose}>
      <figure className="popup__place-image" onClick={(evt) => {evt.stopPropagation()}}>
        <img className="popup__image" src={ card && card.link } alt={card && card.name}/>
        <button className="popup__button-close" type="button" name="close" aria-label="закрыть" onClick={onClose} />
        <figcaption className="popup__caption">{card && card.name}</figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;

import Popup from "./Popup";

export default function ImagePopup({ card, onClose, isOpen }) {
    const srcImage = (card !== null ? card.link : '')
    const nameImage = (card !== null ? card.name : '')
    return (
        <Popup isOpen={isOpen} onClose={onClose} name='image'>
            <div className="popup__image-container">
                <img className="popup__image" src={srcImage} alt={nameImage} />
                <h2 className="popup__text">{nameImage}</h2>
                <button
                    className="popup__close-button"
                    type="button"
                    onClick={onClose} />

            </div>
        </Popup>
    );
};
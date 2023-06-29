import Popup from "./Popup"

export default function PopupWithForm({ isOpen, name, onClose, children }) {
    return (
        <Popup isOpen={isOpen} name={name} onClose={onClose}>
            <div className='popup__container'>
                {children}
                <button
                    className='popup__close-button'
                    type='button'
                    onClick={onClose} />
            </div>
        </Popup>
    )
};
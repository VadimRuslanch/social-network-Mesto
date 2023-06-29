import PopupWithForm from "./PopupWithForm.js";

export default function DelitePopup({ isOpen, onClose, onCardDelete, card }) {

    function handleImageDelete(e) {
        e.preventDefault();
        onCardDelete(card);
    }

    return (
        <PopupWithForm
            name='delite'
            title='Вы уверены?'
            isOpen={isOpen}
            onClose={onClose} >
            <form className="form" >
                <button
                    className="form__save-button form__save-button_black"
                    type="submit"
                    onClick={handleImageDelete}>Да
                </button>
            </form>
        </PopupWithForm>
    )
}
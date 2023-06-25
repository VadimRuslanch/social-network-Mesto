import PopupWithForm from "./PopupWithForm.js";
import { useEffect, useRef } from "react";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const avatarRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar(avatarRef.current.value);
    };

    useEffect(() => {
        avatarRef.current.value = "";
    }, [isOpen]);

    return (
        <PopupWithForm
            name='avatar'
            isOpen={isOpen}
            onClose={onClose}

        >
            <h2 className="popup__header">Обновить аватар</h2>
            <form className="form" onSubmit={handleSubmit} noValidate>
                <input
                    className="form__input form__input_white"
                    type="url"
                    placeholder="Ссылка на картинку"
                    ref={avatarRef}
                />
                <span className="form__error input-avatar-error">
                </span>
                <button
                    className="form__save-button form__save-button_black"
                    type="submit">Сохранить
                </button>
            </form>

        </PopupWithForm>)
}
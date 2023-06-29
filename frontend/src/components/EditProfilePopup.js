import PopupWithForm from "./PopupWithForm.js";
import { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js"

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
    const currentUser = useContext(CurrentUserContext);
    const [formValue, setFormValue] = useState({
        name: '',
        about: '',
    })

    function handleChange(e) {
        const { name, value } = e.target;
        setFormValue({
            ...formValue,
            [name]: value,
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        const { name, about } = formValue;
        onUpdateUser({ name, about })
    };

    useEffect(() => {
        const { name, about } = currentUser;
        setFormValue({
            name, about
        });
    }, [currentUser, isOpen]); //Изменения по eslint, возможна ошибка

    return (
        <>
            <PopupWithForm
                name='profile'
                isOpen={isOpen}
                onClose={onClose}
            >
                <h2 className="popup__header">Редактировать профиль</h2>
                <form className="form" onSubmit={handleSubmit} noValidate>
                    <input
                        className="form__input form__input_white"
                        type="text"
                        placeholder="Ваше имя"
                        minLength={2}
                        maxLength={40}
                        name='name'
                        value={formValue.name || ''}
                        onChange={handleChange}
                        required
                    />
                    <span className="form__error input-name-error" />
                    <input
                        className="form__input form__input_white"
                        id="input-about-me"
                        type="text"
                        placeholder="Расскажите о себе"
                        minLength={2}
                        maxLength={200}
                        name='about'
                        value={formValue.about || ''}
                        onChange={handleChange}
                        required
                    />
                    <span className="form__error input-about-me-error" />
                    <button
                        className="form__save-button form__save-button_black"
                        type="submit">Сохранить
                    </button>
                </form>
            </PopupWithForm>
        </>
    );
};
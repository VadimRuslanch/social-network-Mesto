import PopupWithForm from "./PopupWithForm.js";
import { useState, useEffect } from "react";

export default function AddPlacePopup({ isOpen, onClose, onAddCard }) {
    const [formValue, setFormValue] = useState({
        name: "",
        link: ""
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setFormValue({
            ...formValue,
            [name]: value
        });
    };

    function handleSubmit(e) {
        e.preventDefault();
        const { name, link } = formValue;
        onAddCard({ name, link });
    };

    useEffect(() => {
        const name = "";
        const link = "";
        setFormValue({
            name, link
        });
    }, [isOpen]);


    return (
        <PopupWithForm
            name='addImage'
            isOpen={isOpen}
            onClose={onClose}
        >
            <h2 className="popup__header">Новое место</h2>
            <form className="form" onSubmit={handleSubmit} noValidate>
                <input
                    className="form__input form__input_white"
                    type="text"
                    placeholder="Название"
                    minLength={2}
                    maxLength={30}
                    name="name"
                    value={formValue.name}
                    onChange={handleChange}
                    required
                />
                <span className="form__error input-title-error" />
                <input
                    className="form__input form__input_white"
                    type="url"
                    name="link"
                    placeholder="Ссылка на картинку"
                    value={formValue.link}
                    onChange={handleChange}
                    required
                />
                <span className="form__error input-link-error" />
                <button
                    className="form__save-button form__save-button_black"
                    type="submit">Сохранить
                </button>
            </form>
        </PopupWithForm>
    );
};
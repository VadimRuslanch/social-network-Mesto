import { Link } from "react-router-dom";
import { useState } from "react";
import Header from "./Header";
import AuthForm from "./AuthForm";

export default function Register({ onRegister }) {
    const [formValue, setFormValue] = useState({
        password: '',
        email: '',
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
        const { password, email } = formValue;
        onRegister({ password, email })
    };

    return (
        <AuthForm
            onChange={handleChange}
            onSubmit={handleSubmit}
            formValue={formValue}
            elementHeader={<Link className="header__button-login" to='/sign-in'>Войти</Link>}
            textLogin='Регистрация'
            textBtn='Зарегистрироваться'
            element={< p className="login__enter" > Уже зарегистрированы ? <Link className="login__enter login__enter_sign-in" to="/sign-in">Войти</Link></p >}
        />
    )
}
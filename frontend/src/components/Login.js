import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthForm from "./AuthForm";

export default function Login({ onLogin }) {
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
        onLogin({ password, email });
    };

    return (
        <AuthForm
            onChange={handleChange}
            onSubmit={handleSubmit}
            formValue={formValue}
            elementHeader={<Link className="header__button-login" to='/sign-up'>Регистрация</Link>}
            textLogin='Вход'
            textBtn='Войти'
        />
    )
}
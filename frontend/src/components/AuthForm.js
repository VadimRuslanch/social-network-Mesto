import Header from "./Header";

export default function AuthForm({ onChange, onSubmit, formValue, textLogin, textBtn, element, elementHeader }) {
    return (
        <>
            <Header element={elementHeader} />
            <section className="login">
                <h2 className="login__header">{textLogin}</h2>
                <form
                    className='login__form'
                    onSubmit={onSubmit}>
                    <input
                        className='form__input form__input_black'
                        placeholder="Email"
                        type='email'
                        name="email"
                        value={formValue.email}
                        onChange={onChange}
                    />
                    <span className="form__error form__error_login" />
                    <input
                        className='form__input form__input_black'
                        placeholder="Пароль"
                        type='password'
                        name="password"
                        value={formValue.password}
                        onChange={onChange}
                    />
                    <span className="form__error form__error_login" />
                    <button
                        className='form__save-button form__save-button_white'>{textBtn}</button>
                    {element}
                </form>
            </section>
        </>
    )
}
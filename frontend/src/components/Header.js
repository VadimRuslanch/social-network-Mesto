import logo from '../images/logo.svg'

export default function Header(props) {
    return (
        <header className="header">
            <img
                className="header__logo"
                src={logo}
                alt="Logo"
            />
            {props.element}
        </header>
    )
};
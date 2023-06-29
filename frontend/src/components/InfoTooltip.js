import icon_successful from '../images/icon-successful.svg';
import icon_not_successful from '../images/icon-not-successful.svg';
import PopupWithForm from './PopupWithForm';

export default function InfoTooltip({ isOpen, onClose, isRegister }) {
    return (
        <PopupWithForm
            name='tooltip'
            isOpen={isOpen}
            onClose={onClose} >
            <img className='popup__icon' src={isRegister ? icon_successful : icon_not_successful} />
            <h2 className="popup__title">{isRegister ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</h2>
        </PopupWithForm>
    )
};
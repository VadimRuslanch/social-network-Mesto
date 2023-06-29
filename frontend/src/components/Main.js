import Cards from "./Cards.js";
import Header from "./Header.js";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

export default function Main({ cards, email, onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onDeliteClick, onSignOut }) {
    const currentUser = useContext(CurrentUserContext);

    return (
        <>
            <Header element={
                <div className="header__profile">
                    <p className="header__email">{email}</p>
                    <Link className="header__button-exit" onClick={onSignOut} to='/sign-in'>Выйти</Link>
                </div>
            } />

            <main className="main">
                <section className="profile">
                    <div className="profile__page-autor">
                        <button
                            className="profile__avatar-button"
                            onClick={onEditAvatar}
                        >
                            <img
                                className="profile__avatar"
                                src={currentUser.avatar}
                                alt="Аватар"
                            />
                        </button>
                        <div className="profile__info">
                            <div className="profile__name">
                                <h1
                                    className="profile__info-name profile-info"
                                    id="name"
                                    name="name"
                                >
                                    {currentUser.name}
                                </h1>
                                <button
                                    className="profile__edit-button" type="button"
                                    onClick={onEditProfile} />
                            </div>
                            <p
                                className="profile__info-about-me profile-info"
                                id="about"
                                name="about"
                            >
                                {currentUser.about}
                            </p>
                        </div>
                    </div>
                    <button
                        className="profile__add-button"
                        type="button"
                        onClick={onAddPlace}>
                        <div className="profile__add-button-plus"
                        />
                    </button>
                </section>
                <section className="elements">
                    {cards.map((card) => (<Cards
                        key={card._id}
                        card={card}
                        onCardClick={onCardClick}
                        onCardLike={onCardLike}
                        onDeliteClick={onDeliteClick} />)
                    )}
                </section>
            </main>
        </>
    )
};
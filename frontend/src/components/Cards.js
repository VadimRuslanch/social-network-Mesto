import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { useContext } from "react";

export default function Cards({ card, onCardClick, onCardLike, onDeliteClick }) {
    const currentUser = useContext(CurrentUserContext);
    const isOwn = card.owner === currentUser._id;
    const isLiked = card.likes.some((person) => person._id === currentUser._id);
    const cardLikeButtonClassName = `element__like ${(isLiked && "element__like_active") || ""}`;

    function handleImageClick() {
        onCardClick(card);
    };

    function handleLikeClick() {
        onCardLike(card)
    };

    function handleDeleteClick() {
        onDeliteClick(card)
    }

    return (
        <article className="element" >
            <button className="element__button-img">
                <img
                    className="element__img"
                    src={card.link}
                    alt={card.name}
                    onClick={handleImageClick}
                />
            </button>

            {isOwn && <button
                className='element__trash'
                onClick={handleDeleteClick}
            />}
            <div className="element__group-text-like">
                <h2 className="element__text">
                    {card.name}
                </h2>
                <div className="element__likes">
                    <button
                        className={cardLikeButtonClassName}
                        onClick={handleLikeClick} />
                    <span className="element__likes-number">{card.likes.length}</span>
                </div>
            </div>
        </article>
    );
};
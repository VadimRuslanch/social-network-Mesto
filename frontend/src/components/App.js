import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import ProtectedRoute from './ProtectedRoute.js';

import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup";
import InfoTooltip from './InfoTooltip.js';
import DelitePopup from './DelitePopup.js';
import ImagePopup from "./ImagePopup.js";

import Main from './Main.js';
import Register from "./Register.js";
import Login from './Login.js';
import Footer from './Footer.js';

import api from "../utils/api.js";
import auth from '../utils/auth.js';

export default function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isDelitePopup, setIsDelitePopup] = useState(false);
  const [isInfoTooltip, setIsInfoTooltip] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [cardDelite, setCardDelite] = useState({});
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCardsList()])
      .then(([userData, initialCards]) => {
        setCurrentUser(userData)
        setCards(initialCards)
      })
      .catch(res => { throw new Error(res.message) })

    const token = localStorage.getItem("token");

    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          setIsLoggedIn(true);
          setEmail(res.email);
          navigate('/');
        })
        .catch(res => { throw new Error(res.message) });
    }
  }, [setCurrentUser, setCards, setIsLoggedIn, setEmail, navigate])

  function handleLogin(userData) {
    auth
      .authorization(userData)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          setIsLoggedIn(true);
          navigate('/');
        } else {
          handleInfoTooltip(false)
        }
      })
      .catch(res => { throw new Error(res.message) });
  };

  function handleLogout() {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/signin')
  }

  function handleRegister(userData) {
    auth
      .register(userData)
      .then((res) => {
        handleInfoTooltip(res.ok)
      })
      .catch(res => { throw new Error(res.message) });
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  };

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };

  function handleInfoTooltip(data) {
    setIsRegister(data)
    setIsInfoTooltip(true)
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsInfoTooltip(false);
    setIsImagePopupOpen(false);
    setSelectedCard(null);
    setIsDelitePopup(false);
  };

  function handleDeleteClick(card) {
    setIsDelitePopup(true);
    setCardDelite(card)
  };

  function handleCardClick(link) {
    setSelectedCard(link);
    setIsImagePopupOpen(true)
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
      })
      .catch(res => { throw new Error(res.message) });
  };

  function handleCardDelete(card) {
    console.log(card);
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((item) => item._id !== card._id))
        setIsDelitePopup(false)
      })
      .catch(res => { throw new Error(res.message) });
  };

  function handleUpdateUser(userInfo) {
    api
      .setUserInfo(userInfo)
      .then((newUserInfo) => {
        setCurrentUser(newUserInfo)
        closeAllPopups()
      })
      .catch(res => { throw new Error(res.message) });
  };

  function handleUpdateAvatar(avatar) {
    api
      .setUserAvatar(avatar)
      .then((newUserInfo) => {
        setCurrentUser(newUserInfo)
        closeAllPopups()
      })
      .catch(res => { throw new Error(res.message) });
  };

  function handleAddPlaceSubmit(newCard) {
    api
      .addCard(newCard)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups()
      })
      .catch(res => { throw new Error(res.message) });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route
          path='/'
          element={
            <ProtectedRoute
              onloggedIn={isLoggedIn}
              element={
                <Main
                  cards={cards}
                  email={email}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onDeliteClick={handleDeleteClick}
                  onSignOut={handleLogout}
                />
              }
            />
          }
        />
        <Route
          path='/signup'
          element={<Register onRegister={handleRegister} />} />
        <Route
          path='/signin'
          element={<Login onLogin={handleLogin} />} />
      </Routes>
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddCard={handleAddPlaceSubmit}
      />
      <ImagePopup
        isOpen={isImagePopupOpen}
        onClose={closeAllPopups}
        card={selectedCard}
      />
      <InfoTooltip
        isOpen={isInfoTooltip}
        onClose={closeAllPopups}
        isRegister={isRegister}
      />
      <DelitePopup
        card={cardDelite}
        isOpen={isDelitePopup}
        onClose={closeAllPopups}
        onCardDelete={handleCardDelete} />
      <Footer />
    </CurrentUserContext.Provider>
  );
};
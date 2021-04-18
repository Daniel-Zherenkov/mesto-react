import React, { useState } from "react";

import Footer from './Footer'
import Header from './Header'
import Main from './Main'
import PopupWithForm from './PopupWithForm'
import '../blocks/popup-opened/popup-opened.css'
import ImagePopup from './ImagePopup'


function App() {
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(false);

    const handleEditAvatarClick = () => {
        setIsEditAvatarPopupOpen(true)
    }

    const handleEditProfileClick = () => {
        setIsEditProfilePopupOpen(true)
    }

    const handleAddPlaceClick = () => {
        setIsAddPlacePopupOpen(true)
    }

    const closeAllPopups = () => {
        setIsEditAvatarPopupOpen(false)
        setIsEditProfilePopupOpen(false)
        setIsAddPlacePopupOpen(false)
        setSelectedCard(false)
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }



    return (
        <div className="page">

            <Header />
            <Main onCardClick={handleCardClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} />
            <Footer />

            <PopupWithForm name="approve" title="Вы уверены?" buttonText="Да" />

            <PopupWithForm onClose={closeAllPopups} isOpen={isEditProfilePopupOpen} name="profile" title="Редактировать профиль" buttonText="Сохранить">
                <input required minLength="2" maxLength="40" name="profileName" placeholder="Имя" type="text" className="input popup__input-filed profile-popup__input-filed_name" id="name-input" />
                <span className="popup-error__text-input-error" id="name-input-error"></span>
                <input required minLength="2" maxLength="200" name="profileAbout" placeholder="О вас" type="text" className="input popup__input-filed profile-popup__input-filed_about" id="about-input" />
                <span className="popup-error__text-input-error" id="about-input-error"></span>
            </PopupWithForm>

            <PopupWithForm onClose={closeAllPopups} isOpen={isAddPlacePopupOpen} name="add" title="Новое место" buttonText="Создать">
                <input required minLength="2" maxLength="30" name="placeName" placeholder="Название" type="text" className="input popup__input-filed add-popup__input-filed_place" id="name-add-input" />
                <span className="popup-error__text-input-error" id="name-add-input-error"></span>
                <input required type="url" name="link" placeholder="Ссылка" className="input popup__input-filed add-popup__input-filed_link" id="link" />
                <span className="popup-error__text-input-error" id="link-error"></span>
            </PopupWithForm>

            <PopupWithForm onClose={closeAllPopups} isOpen={isEditAvatarPopupOpen} name="edit-avatar" title="Обновить аватар" buttonText="Сохранить">
                <input required type="url" name="avatar" placeholder="Ссылка" className="popup__input-filed input" id="avatar" />
            </PopupWithForm>

            <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        </div>

    );
}

export default App;

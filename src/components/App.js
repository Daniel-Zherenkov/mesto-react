import React, { useState, useEffect } from "react";
import Footer from './Footer'
import Header from './Header'
import Main from './Main'
import PopupWithForm from './PopupWithForm'
import '../blocks/popup-opened/popup-opened.css'
import ImagePopup from './ImagePopup'
import api from '../utils/api'
import { CurrentUserContext } from '../context/CurrentUserContext'
import { CardsContext } from '../context/CardsContext'
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from "./AddPlacePopup";



function App() {
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const [initialCards, setInitialCards] = useState([]);

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
        console.log(card)
    }
    
    

    useEffect(() => {
        Promise.all([api.getProfile(), api.getCards()]).then(([userData, cardsData]) => {
            setCurrentUser(userData)
            setInitialCards(cardsData)
        }).catch(err => { console.log(err) })

    }, [])
    
    function handleCardLike(card) {
        const isLiked = card.likes.some((i) => i._id === currentUser._id);
        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                const newCards = initialCards.map((c) =>
                    c._id === card._id ? newCard : c
                );
                setInitialCards(newCards);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    
    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(() => {
                setInitialCards(initialCards.filter((item) => item._id !== card._id));
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleUpdateUser(userData) {
        api.changeProfile(userData)
        .then((data) => {
            setCurrentUser(data);
            closeAllPopups();
        })
        .catch((err) => {
            console.log(err);
        });
    }

    function handleUpdateAvatar(avatarData) {
        api.changeAvatar(avatarData)
        .then((data) => {
            setCurrentUser(data);
            closeAllPopups();
        })
        .catch((err) => {
            console.log(err);
        });
    }

    function handleAddPlace(placeData) {
        api.addCard(placeData)
            .then((data) => {
                setInitialCards([data, ...initialCards]);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            });
    }


    return (
        <CurrentUserContext.Provider value={currentUser}>
            <CardsContext.Provider value={initialCards}>
                <div className="page">

                    <Header />
                    <Main 
                    onCardDelete={handleCardDelete} 
                    onCardLike={handleCardLike} 
                    onCardClick={handleCardClick} 
                    onEditProfile={handleEditProfileClick} 
                    onAddPlace={handleAddPlaceClick} 
                    onEditAvatar={handleEditAvatarClick} 
                    />

                    <Footer />

                    <PopupWithForm name="approve" title="Вы уверены?" buttonText="Да" />

                    <EditProfilePopup 
                    onUpdateUser={handleUpdateUser} 
                    isOpen={isEditProfilePopupOpen} 
                    onClose={closeAllPopups} 
                    />

                    <EditAvatarPopup 
                    onUpdateAvatar={handleUpdateAvatar} 
                    isOpen={isEditAvatarPopupOpen} 
                    onClose={closeAllPopups} 
                    />

                    <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlace}
                    />



                    <ImagePopup card={selectedCard} onClose={closeAllPopups} />

                </div>
            </CardsContext.Provider>
        </CurrentUserContext.Provider>

    );
}

export default App;

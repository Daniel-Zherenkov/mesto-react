import React, { useEffect, useState } from "react";
import api from '../utils/api'
import editButton from '../images/editButton.svg'
import addButton from '../images/addButton.svg'
import Card from "./Card";


function Main(props) {

    const [userAvatar, setUserAvatar] = useState('');
    const [userDescription, setUserDescription] = useState('');
    const [userName, setUserName] = useState('');
    const [cards, setCards] = useState([])


    useEffect(() => {

        Promise.all([api.getProfile(), api.getCards()]).then(([userData, cardsData]) => {
            setUserAvatar(userData.avatar)
            setUserDescription(userData.about)
            setUserName(userData.name)
            setCards(cardsData)
        }).catch(err => { console.log(err) })

    }, [])




    return (
        <main>
            <div className="profile">
                <div className="profile__left">
                    <img src={userAvatar} className="profile__avatar" alt="аватар" />
                    <button onClick={props.onEditAvatar} className="profile__edit-avatar"></button>
                    <div className="profile__info">
                        <div className="profile__name-edit-flex">
                            <h1 className="profile__name">{userName}</h1>
                            <button onClick={props.onEditProfile} type="button" className="profile__edit-button">
                                <img src={editButton} alt="редактировать" className="profile__edit-button-img" />
                            </button>
                        </div>
                        <p className="profile__about-self">{userDescription}</p>
                    </div>

                </div>
                <button onClick={props.onAddPlace} type="button" className="profile__add-button">
                    <img src={addButton} alt="добавить" />
                </button>
            </div>


            <div className="elements">
                {cards.map(card => (
                    <Card key={card._id} card={card} onCardClick={props.onCardClick} />
                ))}
            </div>
        </main>

    )
}

export default Main;
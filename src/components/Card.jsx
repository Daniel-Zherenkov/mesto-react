import likeButton from '../images/like.svg'

function Card ({ card, onCardClick }) {

    const { name, link, likes } = card

    function handleClick () {
        return onCardClick({name, link})
    }

    // console.log(handleClick())

    return(
                <div className="element">
                    <img onClick={handleClick} src={link} alt={name} className="element__image" />
                    <button type="button" className="element__trash"></button>
                    <div className="element__footer">
                        <h2 className="element__title">{name}</h2>
                        <button type="button" className="element__like">
                            <img src={likeButton} alt="лайк" className="element__like_icon" />
                            <p className="element__like-count">{likes.length}</p>
                        </button>
                    </div>
                </div>
    )
}

export default Card;
import addButton from '../images/addButton.svg'

function PopupWithForm(props) {

    return (
        <div className={`popup popup__${props.name} ${props.isOpen ? "popup_opened" : " "}`} >
            <form className={`popup__container popup_type_${props.name}`}>
                <button onClick={props.onClose} type="button" className="popup__close-button">
                    <img src={addButton} alt="закрыть" className="popup__close-button-img" />
                </button>
                <h3 className={props.name === 'add' || props.name === 'profile' ? 'add-popup__title' : 'approve-popup__title'}>{props.title}</h3>
                {props.children}
                <button type="submit" className="popup__save-button">{props.buttonText}</button>
            </form>
        </div>
    )
}
export default PopupWithForm;


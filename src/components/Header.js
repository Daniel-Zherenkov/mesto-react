import mainlogo from '../images/logo.svg'

function Header() {
    return(
        <header className="header">
            <img className="header__logo" src={mainlogo} alt="логотип" />
        </header>
    )
}

export default Header;
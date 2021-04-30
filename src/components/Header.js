import mainLogo from '../images/logo.svg'

function Header() {
    return(
        <header className="header">
            <img className="header__logo" src={mainLogo} alt="логотип" />
        </header>
    )
}

export default Header;
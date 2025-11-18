import Logo from "../../assets/homeLogo.png";
import { Link } from "react-router-dom";

function Header({ isLoggedIn, currentUser, onLogOut }) {
  return (
    <header className="header">
      <img className="header__logo" src={Logo} alt="Logo de la Página" />
      <div className="header__container">
        {!isLoggedIn && !currentUser ? (
          <button className="header__signUp">
            <Link to="/signin" className="header__link">
              | Iniciar sesión
            </Link>
          </button>
        ) : (
          <>
            <p className="header__user-email">{currentUser.email}</p>
            <button className="header__signUp" onClick={onLogOut}>
              | Cerrar sesión
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;

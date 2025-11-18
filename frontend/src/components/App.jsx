import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import Register from "./Register/Register";
import SignIn from "./SignIn/SignIn";
import { signUp, signIn, getUser } from "../utils/auth";
import { api } from "../utils/api";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import RegisterPopup from "./RegisterPopup/RegisterPopup";
import { setToken, getToken, removeToken } from "../utils/token";
import ProtectedRoutes from "./ProtectedRoute/ProtectedRoute";

function App() {
  const navigate = useNavigate();

  const [popupState, setPopupState] = useState(null);
  const [cards, setCards] = useState([]);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { currentUser, setCurrentUser } = useCurrentUser(); // Para perfil
  const [authUser, setAuthUser] = useState(null); // Para email del header
  const [showRegisterPopup, setShowRegisterPopup] = useState(false);
  const [registerPopupMessage, setRegisterPopupMessage] = useState("");

  const fetchInitialCards = async () => {
    try {
      const data = await api.getInitialCards();
      setCards(data);
    } catch (err) {
      console.log("Error al traer las tarjetas iniciales", err);
    }
  };

  const fetchProfileInfo = async () => {
    try {
      const data = await api.getProfileInfo();
      setCurrentUser(data);
    } catch (err) {
      console.log("Error al traer la informacion del perfil", err);
    }
  };

  const validateToken = async () => {
    try {
      const token = getToken();
      if (token) {
        const userData = await getUserData(token);
        setAuthUser(userData);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error("Token inválido o expirado", error);
      removeToken();
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    Promise.all([fetchProfileInfo(), fetchInitialCards(), validateToken()]);
  }, []);

  const handleOpenPopup = (popupConfig) => {
    setPopupState(popupConfig);
  };

  const handleClosePopup = () => {
    setPopupState(null);
  };

  const handleSignUp = async ({ email, password }) => {
    try {
      const res = await signUp(email, password);

      if (res.status === 201) {
        setIsRegistered(true);
        setRegisterPopupMessage("¡Correcto! Ya estás registrado.");
        setShowRegisterPopup(true);
        setTimeout(() => setShowRegisterPopup(false), 3000); // 3 segundos
      } else {
        // Esto normalmente no se ejecutará porque signUp lanza error si no es 2xx
        setRegisterPopupMessage("Registro no completado. Inténtalo más tarde.");
      }
    } catch (err) {
      setRegisterPopupMessage(
        "Uy, algo salio mal. Por favor inténtalo de nuevo."
      );
      setIsRegistered(false);
      setShowRegisterPopup(true);
      setTimeout(() => setShowRegisterPopup(false), 3000); // 3 segundos
    }
  };

  const handleLogIn = async ({ email, password }) => {
    try {
      const res = await signIn(email, password);
      if (res?.token) {
        setToken(res.token);
        const userData = await getUser(res.token);
        setAuthUser(userData.data);
        setIsLoggedIn(true);
        navigate("/");
      }
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
    }
  };

  const handleLogOut = () => {
    removeToken();
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate("/signin");
  };

  return (
    <div className="page__content">
      <Header
        isLoggedIn={isLoggedIn}
        currentUser={authUser}
        onLogOut={handleLogOut}
      />
      <Routes>
        <Route
          path="/signup"
          element={
            <Register
              handleSignUp={handleSignUp}
              isRegistered={setIsRegistered}
            />
          }
        />
        <Route
          path="/signin"
          element={
            <SignIn handleLogIn={handleLogIn} isRegistered={setIsRegistered} />
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoutes isLoggedIn={isLoggedIn}>
              <Main
                cards={cards}
                setCards={setCards}
                popup={popupState}
                onOpenPopup={handleOpenPopup}
                onClosePopup={handleClosePopup}
              />
            </ProtectedRoutes>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
      {showRegisterPopup && (
        <RegisterPopup
          message={registerPopupMessage}
          isRegistered={isRegistered}
        />
      )}
    </div>
  );
}

export default App;

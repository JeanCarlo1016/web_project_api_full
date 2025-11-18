import { useState } from "react";
import { Link } from "react-router-dom"; //

export default function SignIn({ handleLogIn }) {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogIn(data);
  };

  return (
    <form id="signUpForm" className="form__container" onSubmit={handleSubmit}>
      <h3>Inicia sesión</h3>
      <fieldset className="form__content-fieldset">
        <input
          className="form__input form__email"
          type="email"
          placeholder="Correo electrónico"
          id="email"
          name="email"
          autoComplete="username"
          minLength="2"
          maxLength="40"
          required
          value={data.email}
          onChange={handleInputChange}
        />
        <span id="email-error" className="error"></span>
        <input
          className="form__input form__password"
          type="password"
          placeholder="Contraseña"
          id="password"
          name="password"
          autoComplete="current-password"
          minLength="2"
          maxLength="200"
          required
          value={data.password}
          onChange={handleInputChange}
        />
        <span id="password-error" className="error"></span>
      </fieldset>
      <fieldset className="form__content-fieldset">
        <button type="submit" className="form__button-save">
          Inicia sesión
        </button>
        <Link to="/signup" className="form__link">
          ¿Aun no eres miembro? Registrate aquí
        </Link>
      </fieldset>
    </form>
  );
}

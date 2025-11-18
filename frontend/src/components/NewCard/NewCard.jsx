import { useState } from "react";

const NewCard = ({ onCardSubmit }) => {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  const handleCardSubmit = (e) => {
    e.preventDefault();
    onCardSubmit({ name, link, isliked: false });
    setName(""); // Limpia el formulario
    setLink("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
    } else if (name === "link") {
      setLink(value);
    }
  };

  return (
    <form
      id="formCard"
      className="popup__container-form"
      onSubmit={handleCardSubmit}
    >
      <fieldset className="popup__content-fieldset">
        <input
          id="card"
          className="popup__input popup__name"
          type="text"
          placeholder="Título"
          minLength="2"
          maxLength="30"
          required
          name="name"
          value={name}
          onChange={handleInputChange}
        />
        <span id="card-error" className="error"></span>
        <input
          id="link"
          className="popup__input popup__link"
          type="url"
          placeholder="Enlace a la imagen"
          required
          name="link"
          value={link}
          onChange={handleInputChange}
        />
        <span id="link-error" className="error"></span>
      </fieldset>
      <fieldset className="popup__content-fieldset">
        <button type="submit" className="popup__button-save">
          Crear
        </button>
      </fieldset>
    </form>
  );
};

export default NewCard;

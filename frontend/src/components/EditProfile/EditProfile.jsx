import { useState } from "react";

const EditProfile = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, about });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
    } else if (name === "about") {
      setAbout(value);
    }
  };

  return (
    <form
      id="formProfile"
      className="popup__container-form"
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__content-fieldset">
        <input
          className="popup__input popup__name"
          type="text"
          placeholder="Nombre"
          id="name"
          name="name"
          minLength="2"
          maxLength="40"
          required
          value={name}
          onChange={handleInputChange}
        />
        <span id="name-error" className="error"></span>
        <input
          className="popup__input popup__about"
          type="text"
          placeholder="Acerca de mí"
          id="about"
          name="about"
          minLength="2"
          maxLength="200"
          required
          value={about}
          onChange={handleInputChange}
        />
        <span id="about-error" className="error"></span>
      </fieldset>
      <fieldset className="popup__content-fieldset">
        <button type="submit" className="popup__button-save">
          Guardar
        </button>
      </fieldset>
    </form>
  );
};

export default EditProfile;

import { useState } from "react";

const EditAvatar = ({ onUpdateAvatar }) => {
  const [avatar, setAvatar] = useState("");

  const handleAvatarSubmit = (e) => {
    e.preventDefault();
    onUpdateAvatar({ avatar });
  };

  const handleInputChange = (e) => {
    setAvatar(e.target.value);
  };

  return (
    <form
      id="formAvatar"
      className="popup__container-form"
      onSubmit={handleAvatarSubmit}
    >
      <fieldset className="popup__content-fieldset">
        <input
          id="avatar"
          className="popup__input"
          type="url"
          placeholder="Enlace a la imagen"
          required
          name="avatar"
          value={avatar}
          onChange={handleInputChange}
        />
        <span id="avatar-error" className="error"></span>
      </fieldset>
      <fieldset className="popup__content-fieldset">
        <button type="submit" className="popup__button-save">
          Guardar
        </button>
      </fieldset>
    </form>
  );
};

export default EditAvatar;

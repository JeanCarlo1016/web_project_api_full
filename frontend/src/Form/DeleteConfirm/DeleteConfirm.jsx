import { useContext } from "react";

export default function DeleteConfirm({ cardId, onCardDelete }) {
  const handleDelete = (e) => {
    e.preventDefault();
    onCardDelete(cardId);
  };

  return (
    <form
      id="formDelete"
      className="popup__container-form"
      onSubmit={handleDelete}
    >
      <fieldset className="popup__content-fieldset">
        <button type="submit" className="popup__button-save">
          Sí
        </button>
      </fieldset>
    </form>
  );
}

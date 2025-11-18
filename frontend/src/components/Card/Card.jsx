import TrashImage from "../../assets/trash.png";
import ImagePopup from "../ImagePopup/ImagePopup";
import DeleteConfirm from "../../Form/DeleteConfirm/DeleteConfirm";

export default function Card({
  card,
  title,
  imageSrc,
  isliked,
  onLike,
  onDelete,
  handleOpenPopup,
  handleClose,
}) {
  const imageComponent = {
    extraClassName: "popup__container-image",
    children: <ImagePopup card={{ name: title, link: imageSrc }} />,
  };

  const confirmationPopup = {
    title: "¿Estás seguro?",
    children: (
      <DeleteConfirm
        cardId={card._id}
        onCardDelete={() => {
          onDelete(card._id);
          handleClose();
        }}
      />
    ),
  };

  const cardLikeButtonClassName = isliked
    ? "places__button_like-active"
    : "places__button_like";

  function handleLikeClick() {
    onLike(card);
  }

  return (
    <div className="places__card">
      <button
        onClick={() => handleOpenPopup(confirmationPopup)}
        className="places__button places__button_trash"
        aria-label="Eliminar tarjeta"
      >
        <img src={TrashImage} alt="papelera para eliminar imagen" />
      </button>
      <button
        className="places__image-button"
        onClick={() => handleOpenPopup(imageComponent)}
        aria-label="Imagen ampliada"
      >
        <img className="places__image" alt="Imagen del lugar" src={imageSrc} />
      </button>
      <div className="places__content">
        <p className="places__text">{title}</p>
        <button
          className={`places__button ${cardLikeButtonClassName}`}
          onClick={handleLikeClick}
          aria-label="Marcar como favorito"
        ></button>
      </div>
    </div>
  );
}

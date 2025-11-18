import { useState } from "react";
import Popup from "../Main/Popup/Popup";
import AvatarPopup from "../EditAvatar/EditAvatar";
import NewCard from "../NewCard/NewCard";
import EditProfile from "../EditProfile/EditProfile";
import { initialCards } from "../../utils/utils";
import Cards from "../Card/Cards";
import Profile from "../Profile/Profile";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { api } from "../../utils/api";

function Main({ cards, setCards, popup, onOpenPopup, onClosePopup }) {
  const { currentUser, setCurrentUser } = useCurrentUser();

  const handleAddCard = (newCard) => {
    api
      .addCards({
        name: newCard.name,
        link: newCard.link,
      })
      .then((createdCard) => {
        setCards((prevCards) => [createdCard, ...prevCards]);
      })
      .catch((err) => {
        console.log("No se pudo crear la tarjeta nueva", err);
      })
      .finally(() => {
        onClosePopup();
      });
  };

  async function handleCardLike(card) {
    // Verifica una vez más si a esta tarjeta ya les has dado like
    const isLiked = card.isLiked;

    // Envía una solicitud a la API y obtén los datos actualizados de la tarjeta
    await api
      .toggleLike(card._id, !isLiked)
      .then((newCard) => {
        console.log("Card actualizada:", newCard);
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard
          )
        );
      })
      .catch((err) => {
        console.log("Error al dar like", err);
      });
  }

  const handleDeleteCard = (cardId) => {
    api
      .deleteCard(cardId)
      .then(() => {
        setCards((prevCards) =>
          prevCards.filter((card) => card._id !== cardId)
        );
      })
      .catch((err) => {
        console.log("Error al eliminar la tarjeta:", err);
      });
  };

  const handleSubmit = (userCurrentInfo) => {
    api
      .editProfileInfo({
        name: userCurrentInfo.name,
        about: userCurrentInfo.about,
      })
      .then(() => {
        setCurrentUser({
          ...currentUser,
          name: userCurrentInfo.name,
          about: userCurrentInfo.about,
        });
      })
      .catch((err) => {
        console.log("No se pudo actualizar el perfil", err);
      })
      .finally(() => {
        onClosePopup();
      });
  };

  const onUpdateAvatar = (avatarPhoto) => {
    api
      .editProfilePhoto({
        avatar: avatarPhoto.avatar,
      })
      .then(() => {
        setCurrentUser({
          ...currentUser,
          avatar: avatarPhoto.avatar,
        });
      })
      .catch((err) => {
        console.log("No se pudo actualizar la foto de perfil", err);
      })
      .finally(() => {
        onClosePopup();
      });
  };

  const editProfilePopup = {
    title: "Editar perfil",
    children: <EditProfile onSubmit={handleSubmit} />,
  };

  const newCardPopup = {
    title: "Nuevo lugar",
    children: <NewCard onCardSubmit={handleAddCard} />,
  };
  const avatarPopup = {
    title: "Editar avatar",
    children: <AvatarPopup onUpdateAvatar={onUpdateAvatar} />,
  };

  return (
    <main className="content">
      <Profile
        profileInfo={currentUser}
        onOpenPopup={onOpenPopup}
        avatarPopup={avatarPopup}
        editProfilePopup={editProfilePopup}
        newCardPopup={newCardPopup}
      />
      <Cards
        onLike={handleCardLike}
        onDelete={handleDeleteCard}
        cards={cards}
        onOpenPopup={onOpenPopup}
        onClosePopup={onClosePopup}
        currentUser={currentUser}
      />
      {popup && (
        <Popup
          title={popup.title}
          onClose={onClosePopup}
          extraClassName={popup.extraClassName}
        >
          {popup.children}
        </Popup>
      )}
    </main>
  );
}

export default Main;

import ProfilePhoto from "../../assets/personPhoto.png";
function Profile({
  profileInfo,
  onOpenPopup,
  avatarPopup,
  editProfilePopup,
  newCardPopup,
}) {
  return (
    <section className="profile">
      <div className="profile__content">
        <div className="profile__image-container" aria-label="Editar avatar">
          <img
            className="profile__image"
            src={profileInfo?.avatar || ProfilePhoto}
            alt="Imagen de perfil"
          />
          <button
            className="profile__image-edit-icon"
            onClick={() => onOpenPopup(avatarPopup)}
          ></button>
        </div>
        <div className="profile__content-info">
          <ul>
            {profileInfo ? (
              <>
                <li className="content__info profile__name">
                  {profileInfo.name}
                </li>
                <li className="content__info profile__about">
                  {profileInfo.about}
                </li>
              </>
            ) : (
              <>
                <li className="content__info profile__name">
                  Jean Carlo Cabrera
                </li>
                <li className="content__info profile__about">Desarrollador</li>
              </>
            )}
          </ul>
        </div>
        <div>
          <button
            onClick={() => onOpenPopup(editProfilePopup)}
            className="content__info content__info_edit_button"
            aria-label="Editar perfil"
          ></button>
        </div>
        <button
          onClick={() => onOpenPopup(newCardPopup)}
          className="profile__content-button-add"
          aria-label="Agregar tarjeta"
        >
          +
        </button>
      </div>
    </section>
  );
}

export default Profile;

import CloseButton from "../../../assets/closeButton.png";

function Popup(props) {
  const { onClose, title, children, extraClassName = "" } = props;
  return (
    <div className="popup">
      <button
        onClick={onClose}
        aria-label="Close modal"
        className="popup__close-button"
        type="button"
      >
        <img src={CloseButton} alt="Cerrar el popup" />
      </button>
      <div className={`popup__container ${extraClassName}`}>
        <h3 className="popup__title">{title}</h3>
        {children}
      </div>
    </div>
  );
}
export default Popup;

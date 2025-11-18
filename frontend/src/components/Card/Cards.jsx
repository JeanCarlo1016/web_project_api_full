import Card from "./Card";

const Cards = ({
  cards = [],
  onLike,
  onDelete,
  onOpenPopup,
  onClosePopup,
  currentUser,
}) => {
  if (!Array.isArray(cards)) {
    return <p>Error: las tarjetas no son válidas.</p>;
  }
  return (
    <section className="places" id="cards__zone">
      {cards.length > 0 ? (
        cards.map((card, index) => {
          const isLiked = card.likes?.includes(currentUser?._id);
          return (
            <Card
              key={card._id}
              card={card}
              title={card.name}
              imageSrc={card.link}
              isliked={isLiked}
              index={index}
              onLike={onLike}
              onDelete={onDelete}
              handleOpenPopup={onOpenPopup}
              handleClose={onClosePopup}
            />
          );
        })
      ) : (
        <p>No hay tarjetas para mostrar.</p>
      )}
    </section>
  );
};

export default Cards;

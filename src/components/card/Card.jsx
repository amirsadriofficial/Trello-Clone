import React, { useRef, useState } from "react";
import "./Card.css";
import { Draggable } from "react-beautiful-dnd";

const Card = ({ card, index, list, deleteCard, cardTitleChange }) => {
  const [cards, setCard] = useState(false);
  const todoCard = useRef();
  const handleCardToggle = () => {
    setCard(!cards);
  }
  //delete todo card
  const handleDeleteCard = () => {
    deleteCard(card.id, list.id);
  }
  //handle the cards title change
  const handleCardTitleChange = (e) => {
    const cardTitleSpan = document.getElementById("cardTitleSpan").innerText;
    cardTitleChange(card.id, list.id, cardTitleSpan);
    handleCardToggle();
  }
  let cardToggle;
  //toggle the card element to a draggable span and editable span on condition
  if (cards === true) {
    cardToggle = (
      <>
        <span
          contentEditable="true"
          id="cardTitleSpan"
          ref={todoCard}
          className="textarea"
          onBlur={handleCardTitleChange}
        >
          {card.title}
        </span>
        <button className="saveEdit" onClick={handleCardTitleChange}>
          Save
        </button>
        <button className="deleteCard" onClick={handleDeleteCard}>
          Delete Card
        </button>
      </>
    );
  } else {
    cardToggle = (
      <div className="textarea-wrapper">
        <span className="textarea">{card.title}</span>
        <i onClick={handleCardToggle} className="fas fa-pen"></i>
      </div>
    );
  } 

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided, snapshot) => (
        <div
          className="card_container"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging
        >
          {cardToggle}
        </div>
      )}
    </Draggable>
  );
}

export default Card;
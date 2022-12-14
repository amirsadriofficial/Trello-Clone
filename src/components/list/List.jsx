import React, { useState } from "react";
import "./List.css";
import Card from "../card/Card";
import Listtitle from "../list-title/ListTitle";
import { Droppable, Draggable } from "react-beautiful-dnd";

const List = ({
  list,
  listIndex,
  addMoreCard,
  listTitleChange,
  deleteCard,
  deleteList,
  cardTitleChange,
}) => {
  //save the state of toggle to add new card
  const [addCard, setAddCard] = useState(false);
  //add new card
  const handleAddMoreCard = () => {
    let cardSpan = document.getElementById("cardSpan").innerText;
    //stop function if no input is made
    if (cardSpan === "") return;
    addMoreCard(list.id, cardSpan);
    setAddCard(!addCard);
  }
  //delete list
  const handleDeleteList = () => {
    deleteList(list.id);
  }
  //set the state to toggle the add card part
  const handleAddCardToggle = () => {
    setAddCard(!addCard);
  }
  let addCardToggle;
  if (addCard === true) {
    addCardToggle = (
      <>
        <span
          contentEditable
          rows="3"
          role="textbox"
          className="textarea addCardSpan"
          id="cardSpan"
        ></span>
        <button className="saveNewCard" onClick={handleAddMoreCard}>
          Add Card
        </button>
        <i onClick={handleAddCardToggle} className="fas fa-times"></i>
      </>
    );
  } else {
    addCardToggle = (
        <button className="addCardlistBtn" onClick={handleAddCardToggle}>
          + Add a card
        </button>
    );
  }

  return (
    <Draggable draggableId={list.id} index={listIndex}>
      {(provided) => (
        <div className="list_wrap"
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <div className="list_content">
            <div className="listTitleContainer" {...provided.dragHandleProps}>
              <Listtitle listTitleChange={listTitleChange} list={list} />
              <i
                onClick={handleDeleteList}
                className="deleteIcon fas fa-minus-square"
              ></i>
              <p className="numOfCards">
                {list.cards.length}{" "}
                {list.cards.length === 1 ? " card" : " cards"}
              </p>
            </div>
            <Droppable droppableId={list.id} type="card">
              {(provided) => (
                <div
                  className="todoItems"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {list.cards.map((card, index) => {
                    return (
                      <Card
                        key={card.id}
                        card={card}
                        index={index}
                        list={list}
                        deleteCard={deleteCard}
                        cardTitleChange={cardTitleChange}
                      />
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <div>{addCardToggle}</div>
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default List;
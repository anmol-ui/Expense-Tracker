import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { faEnvelope,faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState,useEffect } from "react";


const List = (props) => {
    // list data
    const [listData, setListData] = useState([]);
    const delay = ms => new Promise(res => setTimeout(res, ms));

    useEffect(() => {
        if (props.items[0] != null) {
            const transactions = props.items[0];
            const updatedListData = transactions.map((transaction) => ({
            id: transaction.id,
            text: transaction.text,
            amount: transaction.amount
            }));
            setListData(updatedListData);
        }
    }, [props.items]);

    const onDragEnd = (result) => {
        // Handle the dropped item
        if (!result.destination) return; // Item was dropped outside of the list
      
        // Reorder the list based on the dragged item
        const items = Array.from(listData);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
      
        setListData(items);
        props.items[1](items); // Update the parent component's state with the new list data
      };


  return (
    <DragDropContext onDragEnd={(result)=>{onDragEnd(result)}}>
      <Droppable droppableId="list">
        {(provided) => (
          <ul id='list' className='list' {...provided.droppableProps} ref={provided.innerRef}>
            {listData.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                {(provided) => (
                  <li
                    className={item.amount<0 ? 'minus' : 'plus'}
                    key={item.id}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                  >
                    <span>{item.text}</span>
                    <span>{item.amount}</span>
                    <button class="delete-btn" onClick={function(e)  {e.preventDefault(); props.items[3](item.id)}} ><FontAwesomeIcon icon={faTrashCan} /></button>
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default List;

import React, { useState } from 'react'
import { CHARACTERS } from './charactersData'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

function App() {
  const [characters, updateCharacters] = useState(CHARACTERS);
  function handleOnDragEnd(result) {
    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateCharacters(items);
  }
  return (
      <div className="App">
        <header className="App-header">
          <h1>カンバンの簡易版</h1>
          <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="characters">
          {(provided) => (
            <ul 
              className="characters"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {characters.map(({id, name, thumb}, index) => {
                return (
                  <Draggable key={id} draggableId={id} index={index}>
                  {(provided) => (
                    <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <div className="characters-thumb">
                      <img src={thumb} alt={`${name} Thumb`} width="100px" />
                    </div>
                    <p>{name}</p>
                  </li>
                  )}
                  </Draggable>
                )
              })}
              {provided.placeholder}
            </ul>
          )}
          </Droppable>
          </DragDropContext>
        </header>
      </div>
  )
}

export default App
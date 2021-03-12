import React from 'react'
import { CHARACTERS } from './charactersData'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

const App = () => {
  const container = {
    width: '260px',
    margin: '0 auto'
  }
  const lists = {
    padding: '40px',
    margin: '0',
    border: '1px solid #ccc'
  }
  const list = {
    listStyle: 'none',
    display: 'flex',
    justifyContent: 'space-around',
    alignItem: 'center',
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '10px',
    marginBottom: '8px'
  }
  return (
      <div className="App" style={container}>
        <header className="App-header">
          <h1>カンバンの簡易版</h1>
          <DragDropContext>
          <Droppable droppableId="characters">
          {(provided) => (
            <ul className="characters" style={lists} {...provided.droppableProps} ref={provided.innerRef}>
              {CHARACTERS.map(({id, name, thumb}, index) => {
                return (
                  <Draggable key={id} draggableId={id} index={index}>
                  {(provided) => (
                    <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} style={list}>
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
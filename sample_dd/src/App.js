import React, { useState } from 'react'
import { CHARACTERS } from './charactersData'
import styled from 'styled-components'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

const Container = styled.div`
  margin: 20px auto 8px;
  padding: 8px;
  border: 1px solid lightgray;
  width: 300px;
`

const Title = styled.h2`
  text-align: center;
`

const ListWrap = styled.ul`
  padding: 0;
`

const List = styled.li`
  list-style: none;
  display: flex;
  justify-content: space-around;
  padding: 8px;
  margin: 0 auto 8px;
`

const Text = styled.p`
  font-size: 18px;
  font-weight: bold;
`

function App() {
  const [characters, updateCharacters] = useState(CHARACTERS);
  function handleOnDragEnd(result) {
    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateCharacters(items);
  }
  return (
      <Container className="App">
        <header className="App-header">
          <Title>カンバンの簡易版</Title>
          <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="characters">
          {(provided) => (
            <ListWrap 
              className="characters"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {characters.map(({id, name, thumb}, index) => {
                return (
                  <Draggable key={id} draggableId={id} index={index}>
                  {(provided) => (
                    <List ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <div className="characters-thumb">
                      <img src={thumb} alt={`${name} Thumb`} width="100px" />
                    </div>
                    <Text>{name}</Text>
                  </List>
                  )}
                  </Draggable>
                )
              })}
              {provided.placeholder}
            </ListWrap>
          )}
          </Droppable>
          </DragDropContext>
        </header>
      </Container>
  )
}

export default App
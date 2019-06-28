import React from 'react'
import styled from 'styled-components'
import Task from './task'
import { Droppable } from 'react-beautiful-dnd'
import lock from './lock.png'
import unlock from './unlock.png'
import './style.css'

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 220px;

  display: flex;
  flex-direction: column;
`
const Title = styled.h3`
  padding: 8px;
`
const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${props =>
    props.isDraggingOver ? 'skyblue' : 'white'}
  flex-grow: 1;
  min-height: 100px;
`

const Lock = styled.img`
  margin-top: 0.5vw;
  margin-right: 1vw;
  width: 1.5vw;
  height: 1.5vw;
  content: url(${props => (props.isDraggingOver ? unlock : lock)});
`

export default class Column extends React.Component {
  render() {
    return (
      <Droppable droppableId={this.props.column.id} type="TASK">
        {(provided, snapshot) => (
          <Container>
            <div className="headContainer">
              <Title>{this.props.column.title}</Title>
              <Lock
                isDraggingOver={snapshot.isDraggingOver}
                className="icon_lock"
                alt="lock"
              />
            </div>
            {/* //-----------------------Task List-----------------------------// */}
            <TaskList
              innerRef={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {this.props.tasks.map((task, index) => (
                <Task key={task.id} task={task} index={index} />
              ))}
              {provided.placeholder}
            </TaskList>
          </Container>
        )}
      </Droppable>
    )
  }
}

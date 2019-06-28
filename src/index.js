import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import '@atlaskit/css-reset'
import { DragDropContext } from 'react-beautiful-dnd'
import styled from 'styled-components'
import initialData from './initial-data'
import Column from './column'

const Container = styled.div`
  display: flex;
`

const h1 = {
  marginLeft: '1vw'
}
class App extends Component {
  state = initialData

  toggleNavView = () => {
    document.getElementById('menu').classList.toggle('shownav')
  }

  onDragStart = () => {
    this.toggleNavView()
  }

  onDragEnd = result => {
    const { destination, source, draggableId } = result

    if (!destination) {
      this.toggleNavView()
      return
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      this.toggleNavView()
      return
    }

    const start = this.state.columns[source.droppableId]
    const finish = this.state.columns[destination.droppableId]

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds)
      newTaskIds.splice(source.index, 1)
      newTaskIds.splice(destination.index, 0, draggableId)

      const newColumn = {
        ...start,
        taskIds: newTaskIds
      }

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn
        }
      }

      this.setState(newState)
      this.toggleNavView()
      return
    }

    // Moving from one list to another
    const startTaskIds = Array.from(start.taskIds)
    startTaskIds.splice(source.index, 1)
    const newStart = {
      ...start,
      taskIds: startTaskIds
    }

    const finishTaskIds = Array.from(finish.taskIds)
    finishTaskIds.splice(destination.index, 0, draggableId)
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds
    }

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish
      }
    }
    this.setState(newState)
    this.toggleNavView()
  }

  render() {
    return (
      <DragDropContext
        onDragEnd={this.onDragEnd}
        onDragStart={this.onDragStart}
      >
        <Container>
          {this.state.columnOrder.map(columnId => {
            const column = this.state.columns[columnId]
            const tasks = column.taskIds.map(
              taskId => this.state.tasks[taskId]
            )

            return (
              <Column key={column.id} column={column} tasks={tasks} />
            )
          })}
        </Container>
        <div className="main-nav-div">
          {/* <button className="burgers" onClick={this.toggleNavView} />
          <label
            aria-hidden="true"
            onClick={this.toggleNavView}
            id="labeel"
          /> */}

          <nav id="menu" className="main-nav-nav">
            <div className="white b f5 ma3 idonnav" />
            <h1 style={h1}>Hello I'm Sliding</h1>
          </nav>
        </div>
      </DragDropContext>
    )
  }
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)

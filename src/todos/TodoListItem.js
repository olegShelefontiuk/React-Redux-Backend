import React from 'react';

import styled from "styled-components";

const TodoItemContainer = styled.div`
  background: #fff;
  border-radius: 8px;
  
  margin-top: 8px;
  padding: 16px;
  position: relative;
  box-shadow: 0 4px 8px grey;
`
const TodoItemContainerWithWarning = styled(TodoItemContainer)`
  border-bottom:${props => (new Date(props.createdAt) > new Date(Date.now() - 8640000 * 5)
          ? 'none' : '2px solid red')} ;
`

const ButtonsContainer = styled.div`
  position: absolute;
  right: 12px;
  bottom: 12px;
`

const ButtonComplete = styled.button`
  font-size: 16px;
  padding: 8px;
  border: none;
  border-radius: 8px;
  outline: none;
  cursor: pointer;
  display: inline-block;
  background-color: #22ee22;
`

const ButtonRemove = styled(ButtonComplete)`
 
  background-color: #ee2222;
  margin-left: 8px;
`

const TodoListItem = ({ todo, onRemovePressed, onCompletedPressed }) => {

    const Container = todo.isCompleted ? TodoItemContainer : TodoItemContainerWithWarning
    return(
        <Container createdAt={todo.createdAt}>
            <h3>{todo.text}</h3>
            <p>
                Created at: &nbsp;
                {(new Date(todo.createdAt)).toLocaleDateString()}
            </p>
            <ButtonsContainer>
                {todo.isCompleted
                    ? null
                    : <ButtonComplete
                        onClick={() => onCompletedPressed(todo.id)}
                        className="completed-button">Mark As Completed</ButtonComplete>}
                <ButtonRemove
                    onClick={() => onRemovePressed(todo.id)}
                    className="remove-button">Remove</ButtonRemove>
            </ButtonsContainer>
        </Container>
    );
}

export default TodoListItem;
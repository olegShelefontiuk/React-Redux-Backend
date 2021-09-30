import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import NewTodoForm from './NewTodoForm';
import TodoListItem from './TodoListItem';
import {getTodosLoading} from "./selectors";

import {getCompletedTodos, getIncompleteTodos} from "./selectors";
import {markTodoAsCompletedRequest, loadTodos, removeTodoRequest} from "./thunks";

import styled from "styled-components"

const ListWrapper = styled.div`
  max-width: 700px;
  margin: auto;`

const TodoList = ({completedTodos, incompleteTodos, onRemovePressed, startLoadingTodos, onCompletedPressed, onDisplayAlertClicked, isLoading }) =>{
    useEffect(() =>{
        startLoadingTodos()
    },[])

    const loadingMessage = (
        <div>Loading...</div>
    )

   const content = (

    <ListWrapper>
        <NewTodoForm />
        <h3>Incomplete:</h3>
        {incompleteTodos.map(todo => <TodoListItem
            key={todo.text}
            todo={todo}
            onRemovePressed={onRemovePressed}
            onCompletedPressed={onCompletedPressed}/>)}
        <h3>Completed:</h3>
        {completedTodos.map(todo => <TodoListItem
            key={todo.text}
            todo={todo}
            onRemovePressed={onRemovePressed}
            onCompletedPressed={onCompletedPressed}/>)}
    </ListWrapper>
)
 return isLoading ? loadingMessage : content
};

const mapStateToProps = state => ({
    isLoading: getTodosLoading(state),
    completedTodos: getCompletedTodos(state),
    incompleteTodos: getIncompleteTodos(state)
});

const mapDispatchToProps = dispatch => ({
    startLoadingTodos: () => dispatch(loadTodos()),
    onRemovePressed: id => dispatch(removeTodoRequest(id)),
    onCompletedPressed: id => dispatch(markTodoAsCompletedRequest(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
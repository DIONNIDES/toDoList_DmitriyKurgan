import React, {useCallback, useEffect} from 'react';
import './App.css';
import {AddItemForm} from '../components/AddItemForm/AddItemForm';
import {addTodolistTC, requestTodolistsTC} from '../features/TodolistsList/Todolist/todolists-reducer';
import {useDispatch} from 'react-redux';
import {TaskType, TodolistType} from '../api/api';
import {ButtonAppBar} from '../components/ButtonAppBar/ButtonAppBar';
import {Container} from '@mui/material';
import {TodolistsList} from '../features/TodolistsList/TodolistsList';

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {
    const dispatch = useDispatch();

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title));
    }, [dispatch])

    useEffect(() => {
        dispatch(requestTodolistsTC())
    }, [])

    return (
        <div className="App">
            <ButtonAppBar/>

            <Container fixed style={{marginTop: '2rem', marginBottom: '2rem'}}>
                <AddItemForm addItem={addTodolist}/>
            </Container>

            <Container fixed>
                <TodolistsList/>
            </Container>

        </div>
    );


}


export default AppWithRedux;



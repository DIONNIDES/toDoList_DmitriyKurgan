import React, {useCallback, useEffect} from 'react';
import './App.css';
import {AddItemForm} from './AddItemForm';
import {addTodolistTC, requestTodolistsTC} from './state/todolists-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import {TodolistWithRedux} from './TodolistWithRedux';
import {selectorTodolist} from './state/selectors/selectorTodolist';
import {TaskType, TodolistType} from './api/api';
import {ButtonAppBar} from './components/ButtonAppBar';
import {Container, Grid, Paper} from '@mui/material';

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistDomainType = TodolistType & {
    filter:FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    let todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(selectorTodolist);

    const dispatch = useDispatch();

    const addTodolist = useCallback((title: string) =>{
        dispatch(addTodolistTC(title));
    }, [dispatch])

    useEffect(() =>{
        dispatch(requestTodolistsTC())
    },[])

    return (
        <div className="App">
            <ButtonAppBar/>

            <Container fixed style={{marginTop:'2rem', marginBottom:'2rem'}}>
                <AddItemForm addItem={addTodolist}/>
            </Container>

            <Container fixed>

                <Grid container spacing={3}>{
                    todolists.map(tl => {
                        return <Grid item key={tl.id}>
                            <Paper elevation={3} style={{padding: '10px', borderRadius:'0.5rem'}}>
                                <TodolistWithRedux
                                    key={tl.id}
                                    todolist={tl}
                                />
                            </Paper>
                        </Grid>
                    })
                }</Grid>
            </Container>

        </div>
    );


}

export default AppWithRedux;

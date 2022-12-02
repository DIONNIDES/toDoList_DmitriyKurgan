import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../app/store';
import {Container, Grid, Paper} from '@mui/material';
import {TodolistWithRedux} from './Todolist/TodolistWithRedux';
import React, {useCallback, useEffect} from 'react';
import {ROUTES, TodolistDomainType} from '../../app/AppWithRedux';
import {AddItemForm} from '../../components/AddItemForm/AddItemForm';
import {addTodolistTC, requestTodolistsTC} from './Todolist/todolists-reducer';
import {Navigate} from 'react-router-dom';

export const TodolistsList = () => {
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists);
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn);
    const dispatch = useDispatch();
    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title));
    }, [dispatch])

    useEffect(() => {
        dispatch(requestTodolistsTC());
    }, [])
    if (!isLoggedIn) {
        return <Navigate to={ROUTES.LOGIN}/>
    }
    return (
        <><Container fixed style={{marginTop: '2rem', marginBottom: '2rem'}}>
            <AddItemForm addItem={addTodolist}/>
        </Container>
            <Grid container spacing={3}>{
                todolists.map(tl => {
                    return (<Grid item key={tl.id}>
                        <Paper elevation={3} style={{padding: '10px', borderRadius: '0.5rem'}}>
                            <TodolistWithRedux key={tl.id} todolist={tl}/>
                        </Paper>
                    </Grid>)
                })
            }</Grid></>
    );
}
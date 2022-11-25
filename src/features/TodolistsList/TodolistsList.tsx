import {useSelector} from 'react-redux';
import {AppRootStateType} from '../../app/store';
import {selectorTodolist} from '../../state/selectors/selectorTodolist';
import {Grid, Paper} from '@mui/material';
import {TodolistWithRedux} from './Todolist/TodolistWithRedux';
import React from 'react';
import {TodolistDomainType} from '../../app/AppWithRedux';

export const TodolistsList = () => {
    let todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(selectorTodolist);
    return (
        <Grid container spacing={3}>{
            todolists.map(tl => {
                return (<Grid item key={tl.id}>
                        <Paper elevation={3} style={{padding: '10px', borderRadius: '0.5rem'}}>
                            <TodolistWithRedux
                                key={tl.id}
                                todolist={tl}
                            />
                        </Paper>
                    </Grid>
                )
            })
        }</Grid>
    );
}
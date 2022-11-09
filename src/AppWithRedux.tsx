import React, {useCallback} from 'react';
import './App.css';
import {TaskType} from './Todolist';
import {AddItemForm} from './AddItemForm';
import {addTodolistAC} from './state/todolists-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import {TodolistWithRedux} from './TodolistWithRedux';
import {selectorTodolist} from './state/selectors/selectorTodolist';

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    let todolists = useSelector<AppRootStateType, Array<TodolistType>>(selectorTodolist);

    const dispatch = useDispatch();

    const addTodolist = useCallback((title: string) =>{
        dispatch(addTodolistAC(title));
    }, [dispatch])

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {
                todolists.map(tl => {
                    return <TodolistWithRedux
                        key={tl.id}
                        todolist={tl}
                    />
                })
            }

        </div>
    );
}

export default AppWithRedux;

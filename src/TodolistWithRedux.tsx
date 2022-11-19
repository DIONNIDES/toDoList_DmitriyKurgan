import React, {memo, useCallback} from 'react';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import {TodolistDomainType} from './AppWithRedux';
import {addTaskAC} from './state/tasks-reducer';
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    deleteTodolistTC,
    removeTodolistAC, updateTodolistTC
} from './state/todolists-reducer';
import {IconButton} from '@material-ui/core';
import DeleteIcon from '@mui/icons-material/Delete';
import {Button} from '@mui/material';
import {TaskStatuses, TaskType} from './api/api';
import {Task} from './Task';
import {TaskWithRedux} from './TaskWithRedux';


type PropsType = {
    todolist: TodolistDomainType
}


export const TodolistWithRedux = memo(({todolist}: PropsType) => {
        //console.log('Rerender')
        //забираем нужный тудулист через селектор в данной компоненте
        //let todo = useSelector<AppRootStateType, TodolistType>(state => state.todolists.find(todo=>todo.id===todolist.id) as TodolistType)

        let tasksForTodolist = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[todolist.id]);
        const dispatch = useDispatch();

        const addTask = useCallback((title: string) => {
            dispatch(addTaskAC(todolist.id, title))
        }, [dispatch])

        const removeTodolist = useCallback(() => {
            dispatch(deleteTodolistTC(todolist.id))
        }, [dispatch]);
        const changeTodolistTitle = useCallback((title: string) => {
            dispatch(updateTodolistTC(todolist.id, title));
        }, [dispatch])


        const onAllClickHandler = useCallback(() => dispatch(changeTodolistFilterAC(todolist.id, 'all')), [dispatch]);
        const onActiveClickHandler = useCallback(() => dispatch(changeTodolistFilterAC(todolist.id, 'active')), [dispatch]);
        const onCompletedClickHandler = useCallback(() => dispatch(changeTodolistFilterAC(todolist.id, 'completed')), [dispatch]);

        if (todolist.filter === 'active') {
            tasksForTodolist = tasksForTodolist.filter(t =>t.status===TaskStatuses.New)
        } else if (todolist.filter === 'completed') {
            tasksForTodolist = tasksForTodolist.filter(t => t.status===TaskStatuses.Completed)
        } else {
            tasksForTodolist = tasksForTodolist
        }

        return <div>
            <h3><EditableSpan value={todolist.title} onChange={changeTodolistTitle}/>
                <IconButton onClick={removeTodolist}>
                    <DeleteIcon/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {
                    tasksForTodolist.map(t => {

                        return <TaskWithRedux
                            todolistID={todolist.id}
                            task={t}/>
                    })
                }
            </ul>
            <div>
                <Button color={'success'} variant={todolist.filter === 'all' ? 'contained' : 'text'}
                        onClick={onAllClickHandler}>All
                </Button>
                <Button color={'primary'} variant={todolist.filter === 'active' ? 'contained' : 'text'}
                        onClick={onActiveClickHandler}>Active
                </Button>
                <Button color={'secondary'} variant={todolist.filter === 'completed' ? 'contained' : 'text'}
                        onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    }
);


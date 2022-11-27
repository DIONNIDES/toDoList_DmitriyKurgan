import React, {memo, useCallback, useEffect} from 'react';
import {AddItemForm} from '../../../components/AddItemForm/AddItemForm';
import {EditableSpan} from '../../../components/EditableSpan/EditableSpan';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../../app/store';
import {TodolistDomainType} from '../../../app/AppWithRedux';
import {addTaskTC, requestedTasksTC} from './tasks-reducer';
import {changeTodolistFilterAC, deleteTodolistTC, updateTodolistTC} from './todolists-reducer';
import {IconButton} from '@material-ui/core';
import DeleteIcon from '@mui/icons-material/Delete';
import {Button} from '@mui/material';
import {TaskStatuses, TaskType} from '../../../api/api';
import {TaskWithRedux} from './Task/TaskWithRedux';


type PropsType = {
    todolist: TodolistDomainType
}


export const TodolistWithRedux = memo(({todolist}: PropsType) => {
        //забираем нужный тудулист через селектор в данной компоненте
        //let todo = useSelector<AppRootStateType, TodolistType>(state => state.TodolistsList.find(todo=>todo.id===todolist.id) as TodolistType)

        let tasksForTodolist = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[todolist.id]);
        const dispatch = useDispatch();

        const addTask = useCallback((title: string) => {
            dispatch(addTaskTC(todolist.id, title))
        }, [todolist.id,dispatch])

        const removeTodolist = useCallback(() => {
            dispatch(deleteTodolistTC(todolist.id))
        }, [todolist.id,dispatch]);

        const changeTodolistTitle = useCallback((title: string) => {
            dispatch(updateTodolistTC(todolist.id, title));
        }, [todolist.id,dispatch])


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

        useEffect(()=>{
            dispatch(requestedTasksTC(todolist.id))
        }, [todolist.id])
        return <div>
            <h3><EditableSpan value={todolist.title} onChange={changeTodolistTitle} disabled={todolist.entityStatus === 'loading'}/>
                <IconButton onClick={removeTodolist} disabled={todolist.entityStatus === 'loading'}>
                    <DeleteIcon/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {
                    tasksForTodolist.map(t => {

                        return <TaskWithRedux
                            todolistID={todolist.id}
                            task={t}
                            entityStatus={todolist.entityStatus}
                        />
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


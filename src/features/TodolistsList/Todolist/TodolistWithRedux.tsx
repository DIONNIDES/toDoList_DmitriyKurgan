import React, {memo, useCallback, useEffect} from 'react';
import {AddItemForm} from '../../../components/AddItemForm/AddItemForm';
import {EditableSpan} from '../../../components/EditableSpan/EditableSpan';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../../app/store';
import {TodolistDomainType} from '../../../app/AppWithRedux';
import {IconButton} from '@material-ui/core';
import DeleteIcon from '@mui/icons-material/Delete';
import {Button} from '@mui/material';
import {
    TaskStatuses, useDeleteTodolistMutation, useUpdateTodolistMutation,
} from '../../../api/todolistAPI';
import {TaskWithRedux} from './Task/TaskWithRedux';
import {changeTodolistFilterAC} from './todolists-reducer';
import {TaskType, useCreateTaskMutation, useGetTasksQuery} from "../../../api/taskAPI";


type PropsType = {
    todolist: TodolistDomainType
}


export const TodolistWithRedux = memo(({todolist}: PropsType) => {
        //забираем нужный тудулист через селектор в данной компоненте
        //let todo = useSelector<AppRootStateType, TodolistType>(state => state.TodolistsList.find(todo=>todo.id===todolist.id) as TodolistType)

        const[deleteTodolist, {}] = useDeleteTodolistMutation();
        const[updateTodolist, {}] = useUpdateTodolistMutation();
        const[createTask, {}] = useCreateTaskMutation();
        let {data} = useGetTasksQuery({todolistId:todolist.id});

        let tasksForTodolist = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[todolist.id]);
        const dispatch = useDispatch();

        const addTask = useCallback(async (title: string) => {
            debugger
            await createTask({todolistId:todolist.id, title});
        }, [todolist.id, dispatch])

        const removeTodolist = useCallback(async () => {
            await deleteTodolist(todolist.id);
        }, [todolist.id, dispatch]);

        const changeTodolistTitle = useCallback(async (title: string) => {
          await updateTodolist({todolistID:todolist.id, title})
        }, [todolist.id, dispatch])


        const onAllClickHandler = useCallback(() => dispatch(changeTodolistFilterAC({todolistId:todolist.id, newFilter:'all'})), [dispatch]);
        const onActiveClickHandler = useCallback(() => dispatch(changeTodolistFilterAC({todolistId:todolist.id, newFilter:'active'})), [dispatch]);
        const onCompletedClickHandler = useCallback(() => dispatch(changeTodolistFilterAC({todolistId:todolist.id, newFilter:'completed'})), [dispatch]);

        if (todolist.filter === 'active') {
            tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.New)
        } else if (todolist.filter === 'completed') {
            tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.Completed)
        } else {
            tasksForTodolist = tasksForTodolist
        }

        return <div>
            <h3><EditableSpan value={todolist.title} onChange={changeTodolistTitle}
                              disabled={todolist.entityStatus === 'loading'}/>
                <IconButton onClick={removeTodolist} disabled={todolist.entityStatus === 'loading'}>
                    <DeleteIcon/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {
                    tasksForTodolist.map(t => {

                        return <TaskWithRedux
                            key={t.id}
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


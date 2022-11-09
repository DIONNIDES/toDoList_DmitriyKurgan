import React, {memo, useCallback} from 'react';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {CheckboxComponent} from './components/CheckboxComponent';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import {FilterValuesType, TodolistType} from './AppWithRedux';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './state/tasks-reducer';
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from './state/todolists-reducer';
import {Task} from './Task';
import {TaskWithRedux} from './TaskWithRedux';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolist: TodolistType
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
            dispatch(removeTodolistAC(todolist.id))
        }, [dispatch]);
        const changeTodolistTitle = useCallback((title: string) => {
            dispatch(changeTodolistTitleAC(todolist.id, title));
        }, [dispatch])

        const onAllClickHandler = useCallback(() => dispatch(changeTodolistFilterAC(todolist.id, 'all')), [dispatch]);
        const onActiveClickHandler = useCallback(() => dispatch(changeTodolistFilterAC(todolist.id, 'active')), [dispatch]);
        const onCompletedClickHandler = useCallback(() => dispatch(changeTodolistFilterAC(todolist.id, 'completed')), [dispatch]);

        if (todolist.filter === 'active') {
            tasksForTodolist = tasksForTodolist.filter(t => !t.isDone )
        } else if (todolist.filter === 'completed') {
            tasksForTodolist = tasksForTodolist.filter(t => t.isDone)
        } else {
            tasksForTodolist = tasksForTodolist
        }


        return <div>
            <h3><EditableSpan value={todolist.title} onChange={changeTodolistTitle}/>
                <button onClick={removeTodolist}>x</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {
                    tasksForTodolist.map(t => {

                        return <TaskWithRedux
                            key={t.id}
                            todolistID={todolist.id}
                            task={t}/>
                    })
                }
            </ul>
            <div>
                <button className={todolist.filter === 'all' ? 'active-filter' : ''}
                        onClick={onAllClickHandler}>All
                </button>
                <button className={todolist.filter === 'active' ? 'active-filter' : ''}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={todolist.filter === 'completed' ? 'active-filter' : ''}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    }
);


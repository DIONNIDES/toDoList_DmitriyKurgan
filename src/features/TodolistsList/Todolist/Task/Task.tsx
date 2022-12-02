import React, {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {CheckboxComponent} from '../../../../components/CheckBox/CheckboxComponent';
import {EditableSpan} from '../../../../components/EditableSpan/EditableSpan';
import {TaskStatuses, TaskType} from '../../../../api/api';
import {removeTaskAC, updateTaskAC} from '../tasks-reducer';

type TaskPropsType = {
    todolistID: string
    task: TaskType
}

export const Task = ({todolistID, task}: TaskPropsType) => {
    const dispatch = useDispatch();
    const removeTask = useCallback(() => {
        dispatch(removeTaskAC(todolistID, task.id))
    }, [todolistID])

    const changeTaskStatus = useCallback(({status}: { status: TaskStatuses }) => {
        dispatch(updateTaskAC(todolistID, task.id, {status}))
    }, [todolistID])

    const changeTaskTitle = useCallback(({title}: { title: string }) => {
        dispatch(updateTaskAC(todolistID, task.id, {title}))
    }, [todolistID])

    return (
        <li key={task.id} className={task.status ? 'is-done' : ''}>
            <CheckboxComponent callback={() => changeTaskStatus} checked={task.status === TaskStatuses.Completed}/>
            <EditableSpan value={task.title} onChange={() => changeTaskTitle}/>
            <button onClick={removeTask}>x</button>
        </li>
    );
};

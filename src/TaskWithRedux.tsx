import React, {memo, useCallback} from 'react';
import {CheckboxComponent} from './components/CheckboxComponent';
import {EditableSpan} from './EditableSpan';
import {useDispatch} from 'react-redux';
import {deleteTaskTC, updateTaskTC} from './state/tasks-reducer';
import {TaskStatuses, TaskType} from './api/api';
import {IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';

type TaskPropsType = {
    todolistID:string
    task:TaskType

}

export const TaskWithRedux = memo(({todolistID,task}:TaskPropsType)=>{

    const dispatch = useDispatch();
    const onClickHandler = useCallback( () =>{
        dispatch(deleteTaskTC(todolistID,task.id))},[dispatch])
    const onTitleChangeHandler = useCallback((title: string) => {
        dispatch(updateTaskTC(todolistID, task.id, {title} ));
    },[dispatch,todolistID,task.id])
    const onChangeTaskStatusHandler = useCallback( (newIsDoneValue:boolean) => {
        let status = newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New
        dispatch(updateTaskTC(todolistID,task.id,{status}));
    },[dispatch, todolistID,task.id]);

    return (
        <li key={task.id} className={task.status===TaskStatuses.Completed? "is-done" : ""}>
            <CheckboxComponent callback={onChangeTaskStatusHandler} checked={task.status === TaskStatuses.Completed}/>
            <EditableSpan value={task.title} onChange={(value)=>onTitleChangeHandler(value)} />
            <IconButton onClick={onClickHandler}>
                <Delete/>
            </IconButton>
        </li>
    );
}
)






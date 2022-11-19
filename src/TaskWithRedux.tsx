import React, {memo, useCallback} from 'react';
import {CheckboxComponent} from './components/CheckboxComponent';
import {EditableSpan} from './EditableSpan';
import {useDispatch} from 'react-redux';
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './state/tasks-reducer';
import {TaskStatuses, TaskType} from './api/api';

type TaskPropsType = {
    todolistID:string
    task:TaskType

}

export const TaskWithRedux = memo(({todolistID,task}:TaskPropsType)=>{

    const dispatch = useDispatch();
    const onClickHandler = useCallback( () =>{
        dispatch(removeTaskAC(todolistID,task.id))},[dispatch])
    const onTitleChangeHandler = useCallback((value: string) => {
        dispatch(changeTaskTitleAC(todolistID, task.id, value ));
    },[dispatch,todolistID,task.id])
    const onChangeHandler = useCallback( (value:boolean) => {
        dispatch(changeTaskStatusAC(todolistID,task.id,value));
    },[dispatch, todolistID,task.id]);


    return (
        <li key={task.id} className={task.status? "is-done" : ""}>
            <CheckboxComponent callback={(value)=>onChangeHandler(value)} checked={task.status === TaskStatuses.Completed}/>
            <EditableSpan value={task.title} onChange={(value)=>onTitleChangeHandler(value)} />
            <button onClick={onClickHandler}>x</button>
        </li>
    );
}
)

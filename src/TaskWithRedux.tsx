import React, {memo, useCallback} from 'react';
import {CheckboxComponent} from './components/CheckboxComponent';
import {EditableSpan} from './EditableSpan';
import {TaskType} from './TodolistWithRedux';
import {useDispatch} from 'react-redux';
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './state/tasks-reducer';

type TaskPropsType = {
    todolistID:string
    task:TaskType

}

export const TaskWithRedux = memo(({todolistID,task}:TaskPropsType)=>{

    const dispatch = useDispatch();


    const onClickHandler = useCallback( (taskID:string) =>{
        dispatch(removeTaskAC(todolistID,task.id))},[dispatch])
    const onTitleChangeHandler = useCallback((taskID:string,newValue: string) => {
        dispatch(changeTaskTitleAC(todolistID, task.id, newValue ));
    },[dispatch])
    const onChangeHandler = useCallback( (taskID:string,checked:boolean) => {
        dispatch(changeTaskStatusAC(todolistID,task.id,checked) );
    },[dispatch]);

    return (
        <li key={task.id} className={task.isDone ? "is-done" : ""}>
            <CheckboxComponent callback={(checked:boolean)=>{onChangeHandler(task.id, checked)}} checked={task.isDone}/>
            <EditableSpan value={task.title} onChange={(value:string)=>onTitleChangeHandler(task.id,value)} />
            <button onClick={()=>onClickHandler(task.id)}>x</button>
        </li>
    );
}
)
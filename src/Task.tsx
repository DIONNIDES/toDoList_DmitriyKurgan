import React from 'react';
import {CheckboxComponent} from './components/CheckboxComponent';
import {EditableSpan} from './EditableSpan';
import {TaskType} from './TodolistWithRedux';

type TaskPropsType = {
    task:TaskType
    removeTask:(taskID:string)=>void
    changeTaskTitle:(taskID:string, value:string)=>void
    changeTaskStatus:(taskID:string, checked:boolean)=>void

}

export const Task = ({task,removeTask,changeTaskTitle,changeTaskStatus}:TaskPropsType) => {
    return (
        <li key={task.id} className={task.isDone ? "is-done" : ""}>
            <CheckboxComponent callback={(checked:boolean)=>{changeTaskStatus(task.id, checked)}} checked={task.isDone}/>
            <EditableSpan value={task.title} onChange={(value:string)=>changeTaskTitle(task.id,value)} />
            <button onClick={()=>removeTask(task.id)}>x</button>
        </li>
    );
};

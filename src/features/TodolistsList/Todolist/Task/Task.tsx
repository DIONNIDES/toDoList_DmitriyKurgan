// import React, {useCallback} from 'react';
// import {CheckboxComponent} from './components/CheckboxComponent';
// import {EditableSpan} from './EditableSpan';
// import {updateTaskAC, changeTaskTitleAC, removeTaskAC} from './state/tasks-reducer';
// import {useDispatch} from 'react-redux';
// import {TaskStatuses, TaskType} from './api/api';
//
// type TaskPropsType = {
//     todolistID:string
//     task:TaskType
// }
//
//
//
// export const Task = ({todolistID, task}:TaskPropsType) => {
//     const dispatch = useDispatch();
//     const removeTask = useCallback(() => {
//         dispatch(removeTaskAC(todolistID, task.id))
//     }, [todolistID])
//
//     const changeTaskStatus = useCallback((checked:boolean) => {
//         dispatch(updateTaskAC(todolistID, task.id, checked))
//     }, [todolistID])
//
//
//     const changeTaskTitle = useCallback((title:string) => {
//         dispatch(changeTaskTitleAC(todolistID, task.id, title))
//     }, [todolistID])
//
//
//     return (
//         <li key={task.id} className={task.status ? "is-done" : ""}>
//             <CheckboxComponent callback={changeTaskStatus} checked={task.status === TaskStatuses.Completed}/>
//             <EditableSpan value={task.title} onChange={changeTaskTitle} />
//             <button onClick={removeTask}>x</button>
//         </li>
//     );
// };


export {}
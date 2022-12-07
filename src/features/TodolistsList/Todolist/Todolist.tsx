// import React, {ChangeEvent} from 'react';
// import {IconButton} from '@material-ui/core';
// import DeleteIcon from '@mui/icons-material/Delete';
//
// import {Button, Checkbox} from '@mui/material';
// import {EditableSpan} from '../../../components/EditableSpan/EditableSpan';
// import {AddItemForm} from '../../../components/AddItemForm/AddItemForm';
// import {TaskStatuses, TaskType} from '../../../api/api';
// import {FilterValuesType} from '../../../app/App';
//
//
// type PropsType = {
//     id: string
//     title: string
//     tasks: Array<TaskType>
//     removeTask: (taskId: string, todolistId: string) => void
//     changeFilter: (todolistId: string, value: FilterValuesType) => void
//     addTask: (title: string, todolistId: string) => void
//     changeTaskStatus: (todolistId: string, id: string, status: TaskStatuses) => void
//     removeTodolist: (id: string) => void
//     changeTodolistTitle: (id: string, newTitle: string) => void
//     filter: FilterValuesType
//     changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
// }
//
// export function Todolist(props: PropsType) {
//     const addTask = (title: string) => {
//         props.addTask(title, props.id);
//     }
//
//     const removeTodolist = () => {
//         props.removeTodolist(props.id);
//     }
//     const changeTodolistTitle = (title: string) => {
//         props.changeTodolistTitle(props.id, title);
//     }
//
//     const onAllClickHandler = () => props.changeFilter(props.id, 'all');
//     const onActiveClickHandler = () => props.changeFilter(props.id, 'active');
//     const onCompletedClickHandler = () => props.changeFilter(props.id, 'completed');
//
//     return <div>
//         <h3><EditableSpan value={props.title} onChange={changeTodolistTitle}/>
//             <IconButton onClick={removeTodolist}>
//                 <DeleteIcon/>
//             </IconButton>
//         </h3>
//         <AddItemForm addItem={addTask}/>
//         <ul>
//             {
//                 props.tasks.map(t => {
//                     const onClickHandler = () => props.removeTask(t.id, props.id)
//                     const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
//                         props.changeTaskStatus(props.id, t.id, t.status);
//                     }
//                     const onTitleChangeHandler = (newValue: string) => {
//                         props.changeTaskTitle(t.id, newValue, props.id);
//                     }
//
//                     return <li key={t.id} className={t.status === TaskStatuses.Completed ? 'is-done' : ''}>
//                         <Checkbox onChange={onChangeHandler} checked={t.status === TaskStatuses.Completed}
//                                   defaultChecked
//                                   sx={{'& .MuiSvgIcon-root': {fontSize: 28}}}/>
//                         <EditableSpan value={t.title} onChange={onTitleChangeHandler}/>
//                         <IconButton onClick={onClickHandler}>
//                             <DeleteIcon/>
//                         </IconButton>
//                     </li>
//                 })
//             }
//         </ul>
//         <div>
//             <Button color={'success'} variant={props.filter === 'all' ? 'contained' : 'text'}
//                     onClick={onAllClickHandler}>All
//             </Button>
//             <Button color={'primary'} variant={props.filter === 'active' ? 'contained' : 'text'}
//                     onClick={onActiveClickHandler}>Active
//             </Button>
//             <Button color={'secondary'} variant={props.filter === 'completed' ? 'contained' : 'text'}
//                     onClick={onCompletedClickHandler}>Completed
//             </Button>
//         </div>
//     </div>
// }
//
//

export {}
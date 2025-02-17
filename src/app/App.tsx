// import React, {useState} from 'react';
// import './App.css';
// import {v1} from 'uuid';
// import {Container, Grid, Paper} from '@mui/material';
// import {ButtonAppBar} from '../components/ButtonAppBar/ButtonAppBar';
// import {AddItemForm} from '../components/AddItemForm/AddItemForm';
// import {Todolist} from '../features/TodolistsList/Todolist/Todolist';
// import {TaskPriorities, TaskStatuses, TaskType} from '../api/api';
//
//
// export type FilterValuesType = 'all' | 'active' | 'completed';
// type TodolistType = {
//     id: string
//     title: string
//     filter: FilterValuesType
// }
//
// type TasksStateType = {
//     [key: string]: Array<TaskType>
// }
//
//
// function App() {
//     function removeTask(id: string, todolistId: string) {
//         //достанем нужный массив по todolistId:
//         let todolistTasks = tasks[todolistId];
//         // перезапишем в этом объекте массив для нужного тудулиста отфилтрованным массивом:
//         tasks[todolistId] = todolistTasks.filter(t => t.id != id);
//         // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
//         setTasks({...tasks});
//     }
//
//     function addTask(title: string, todolistId: string) {
//         let task: TaskType = {
//             id: v1(),
//             status: TaskStatuses.New,
//             title: title,
//             startDate: '',
//             addedDate: '',
//             deadline: '',
//             description: '',
//             priority: TaskPriorities.Low,
//             order: 1,
//             todoListId: todolistId,
//             completed: false
//         };
//         //достанем нужный массив по todolistId:
//         let todolistTasks = tasks[todolistId];
//         // перезапишем в этом объекте массив для нужного тудулиста копией, добавив в начало новую таску:
//         tasks[todolistId] = [task, ...todolistTasks];
//         // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
//         setTasks({...tasks});
//     }
//
//     function changeFilter(todolistId: string, value: FilterValuesType) {
//         let todolist = TodolistsList.find(tl => tl.id === todolistId);
//         if (todolist) {
//             todolist.filter = value;
//             setTodolists([...TodolistsList])
//         }
//     }
//
//     function changeStatus(todolistId: string, id: string, status: TaskStatuses) {
//         //достанем нужный массив по todolistId:
//         let todolistTasks = tasks[todolistId];
//         // найдём нужную таску:
//         let task = todolistTasks.find(t => t.id === id);
//         //изменим таску, если она нашлась
//         if (task) {
//             task.status = status;
//             // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
//             setTasks({...tasks});
//         }
//     }
//
//     function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
//         //достанем нужный массив по todolistId:
//         let todolistTasks = tasks[todolistId];
//         // найдём нужную таску:
//         let task = todolistTasks.find(t => t.id === id);
//         //изменим таску, если она нашлась
//         if (task) {
//             task.title = newTitle;
//             // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
//             setTasks({...tasks});
//         }
//     }
//
//     function removeTodolist(id: string) {
//         // засунем в стейт список тудулистов, id которых не равны тому, который нужно выкинуть
//         setTodolists(TodolistsList.filter(tl => tl.id != id));
//         // удалим таски для этого тудулиста из второго стейта, где мы храним отдельно таски
//         delete tasks[id]; // удаляем св-во из объекта... значением которого являлся массив тасок
//         // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
//         setTasks({...tasks});
//     }
//
//     function changeTodolistTitle(id: string, title: string) {
//         // найдём нужный todolist
//         const todolist = TodolistsList.find(tl => tl.id === id);
//         if (todolist) {
//             // если нашёлся - изменим ему заголовок
//             todolist.title = title;
//             setTodolists([...TodolistsList]);
//         }
//     }
//
//     let todolistId1 = v1();
//     let todolistId2 = v1();
//
//     let [TodolistsList, setTodolists] = useState<Array<TodolistType>>([
//         {id: todolistId1, title: 'What to learn', filter: 'all'},
//         {id: todolistId2, title: 'What to buy', filter: 'all'}
//     ])
//
//     let [tasks, setTasks] = useState<TasksStateType>({
//         [todolistId1]: [
//             {
//                 id: v1(),
//                 title: 'HTML&CSS',
//                 status: TaskStatuses.New,
//                 description: '',
//                 deadline: '',
//                 addedDate: '',
//                 priority: TaskPriorities.Low,
//                 order: 0,
//                 startDate: '',
//                 completed: false,
//                 todoListId: todolistId1
//             },
//             {
//                 id: v1(),
//                 title: 'JS',
//                 status: TaskStatuses.New,
//                 description: '',
//                 deadline: '',
//                 addedDate: '',
//                 priority: TaskPriorities.Low,
//                 order: 0,
//                 startDate: '',
//                 completed: false,
//                 todoListId: todolistId1
//             },
//         ],
//         [todolistId2]: [
//             {
//                 id: v1(),
//                 title: 'MILK',
//                 status: TaskStatuses.New,
//                 description: '',
//                 deadline: '',
//                 addedDate: '',
//                 priority: TaskPriorities.Low,
//                 order: 0,
//                 startDate: '',
//                 completed: false,
//                 todoListId: todolistId1
//             },
//             {
//                 id: v1(),
//                 title: 'React BOOK',
//                 status: TaskStatuses.New,
//                 description: '',
//                 deadline: '',
//                 addedDate: '',
//                 priority: TaskPriorities.Low,
//                 order: 0,
//                 startDate: '',
//                 completed: false,
//                 todoListId: todolistId1
//             },
//         ]
//     });
//
//     function addTodolist(title: string) {
//         let newTodolistId = v1();
//         let newTodolist: TodolistType = {id: newTodolistId, title: title, filter: 'all'};
//         setTodolists([newTodolist, ...TodolistsList]);
//         setTasks({
//             ...tasks,
//             [newTodolistId]: []
//         })
//     }
//
//     return (
//         <div className="App">
//             <ButtonAppBar/>
//
//             <Container fixed style={{marginTop: '2rem', marginBottom: '2rem'}}>
//                 <AddItemForm addItem={addTodolist}/>
//             </Container>
//
//             <Container fixed>
//
//                 <Grid container spacing={3}>{
//                     TodolistsList.map(tl => {
//                         let allTodolistTasks = tasks[tl.id];
//                         let tasksForTodolist = allTodolistTasks;
//
//                         if (tl.filter === 'active') {
//                             tasksForTodolist = allTodolistTasks.filter(t => t.status !== TaskStatuses.Completed);
//                         }
//                         if (tl.filter === 'completed') {
//                             tasksForTodolist = allTodolistTasks.filter(t => t.status === TaskStatuses.Completed);
//                         }
//
//                         return <Grid item>
//                             <Paper elevation={3} style={{padding: '10px', borderRadius: '0.5rem'}}>
//                                 <Todolist
//                                     key={tl.id}
//                                     id={tl.id}
//                                     title={tl.title}
//                                     tasks={tasksForTodolist}
//                                     removeTask={removeTask}
//                                     changeFilter={changeFilter}
//                                     addTask={addTask}
//                                     changeTaskStatus={changeStatus}
//                                     filter={tl.filter}
//                                     removeTodolist={removeTodolist}
//                                     changeTaskTitle={changeTaskTitle}
//                                     changeTodolistTitle={changeTodolistTitle}
//                                 />
//                             </Paper>
//                         </Grid>
//                     })
//                 }</Grid>
//             </Container>
//
//         </div>
//     );
// }
//
// export default App;

export {}
import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType, ActionType} from './TodoList';


export type FilterValuesType = 'all' | 'active' | 'completed';

function App() {
    const todoListTitle = 'What to learn';

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: 'HTML', isDone: true}, //good!
        {id: 2, title: 'CSS', isDone: true}, // bad
        {id: 3, title: 'JS/TS', isDone: false}
    ]);

    const [filter, setFilter] = useState<FilterValuesType>("all");
    let tasksForRender;
    switch (filter) {
        case 'completed':
            tasksForRender = tasks.filter(task => task.isDone );
            break;
        case 'active':
            tasksForRender = tasks.filter(task => !task.isDone );
            break;
        default:
            tasksForRender = tasks;
    }

    const removeTask = (taskId: number) => { //2
        setTasks(tasks.filter(task => task.id !== taskId)) // 3 !==2 =? true
        //работает асинхронно!
        /*console.log(tasks);*/
    };

    const changeFilter = (filter: FilterValuesType ) => {
        setFilter(filter);
    }

    const actions: Array<ActionType> = [
        {id: 1, name: 'All'},
        {id: 2, name: 'Active'},
        {id: 3, name: 'Completed'}
    ];

    return (
        <div className="App">
            <TodoList title={todoListTitle} tasks={tasksForRender} actions={actions}
                      removeTasks={removeTask} changeFilter={changeFilter}/>
        </div>
    );
}

export default App;

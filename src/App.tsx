import React from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";


function App() {
    const tasks: Array<TaskType> = [
        {id: 1, title: 'HTML', isDone: true},
        {id: 2, title: 'CSS', isDone: true},
        {id: 3, title: 'JS/TS', isDone: false}
    ];
    return (
        <div className="App">
            <TodoList title='What to learn' tasks={tasks}/>
            {/* <TodoList title = 'What to buy'/>
            <TodoList title = 'What to read'/>*/}
        </div>
    );
}

export default App;

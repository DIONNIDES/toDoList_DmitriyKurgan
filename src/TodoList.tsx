import React, {FC} from 'react';
import {FilterValuesType} from './App';

type TodoListPropsType = {
    title: string;
    tasks: Array<TaskType>;
    actions: Array<ActionType>;
    removeTasks: (taskId: number) => void;
    changeFilter: ( filter: FilterValuesType ) => void
};
export type TaskType = {
    id: number;
    title: string;
    isDone: boolean;
};

export type ActionType = {
    id: number;
    name: string;
}

const TodoList: FC<TodoListPropsType> = (props) => {
    const taskItems = props.tasks.map((task: TaskType)=> {
        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={()=>{props.removeTasks(task.id) }}>X</button>
            </li>);
    }
);


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {taskItems}
            </ul>
            <div>
                <button onClick={()=>props.changeFilter("all")}>{props.actions[0].name}</button>
                <button onClick={()=>props.changeFilter("active")}> {props.actions[1].name}</button>
                <button onClick={()=>props.changeFilter("completed")}>{props.actions[2].name}</button>
            </div>
        </div>

    );
};

export default TodoList;
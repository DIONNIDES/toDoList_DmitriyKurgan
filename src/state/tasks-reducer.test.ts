import {TasksStateType} from '../App';
import {v1} from 'uuid';
import {addTaskAC, updateTaskAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './tasks-reducer';

let startState: TasksStateType;

beforeEach(()=>{
    let startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS", isDone: true}
        ],
        'todolistId2': [
            {id: '1', title: "Milk", isDone: true},
            {id: '2', title: "React Book", isDone: true}
        ]
    }
})

test('correct tasks should be deleted from array', ()=>{


    const action = removeTaskAC('todolistId2', '2' );
    const endState = tasksReducer(startState, action);

    expect(endState).toEqual({
        'todolistId1': [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS", isDone: true}
        ],
        'todolistId2': [
            {id: '1', title: "Milk", isDone: true},
        ]
    })

})

test('correct task should be changed in array', ()=>{
       const action = addTaskAC('todolistId1','TS' );
    const endState = tasksReducer(startState, action);

    expect(endState).toEqual({
        'todolistId1': [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "TS", isDone: true}
        ],
        'todolistId2': [
            {id: '1', title: "Milk", isDone: true},
            {id: '2', title: "React Book", isDone: true}
        ]
    });

    expect(startState['todolistId1'].length).toBe(2);
    expect(endState['todolistId1'].length).toBe(3);

});

test('correct task title should be changed in array', ()=>{
    const action = changeTaskTitleAC('todolistId1','2', 'REDUX' );
    const endState = tasksReducer(startState, action);

    expect(endState).toStrictEqual({
        'todolistId1': [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "REDUX", isDone: true},
        ],
        'todolistId2': [
            {id: '1', title: "Milk", isDone: true},
            {id: '2', title: "React Book", isDone: true}
        ]
    });


    expect(startState['todolistId1'][1].title).toBe('JS');
    expect(endState['todolistId1'][1].title).toBe('REDUX');

});

test('correct task status should be added to array', ()=>{
    const action = updateTaskAC('todolistId1','2', false );
    const endState = tasksReducer(startState, action);
    expect(endState).toStrictEqual({
        'todolistId1': [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS", isDone: false},
        ],
        'todolistId2': [
            {id: '1', title: "Milk", isDone: true},
            {id: '2', title: "React Book", isDone: true}
        ]
    });

    expect(startState['todolistId1'][1].isDone).toBe(true);
    expect(endState['todolistId1'][1].isDone).toBe(false);

});


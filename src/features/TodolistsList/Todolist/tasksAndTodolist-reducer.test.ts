import {addTodolistAC, removeTodolistAC} from './todolists-reducer';
import {tasksReducer} from './tasks-reducer';
import {TasksStateType} from '../../../app/AppWithRedux';
import {TaskPriorities, TaskStatuses} from '../../../api/todolistAPI';

let startState: TasksStateType;
beforeEach(() => {
    startState = {
        'todolistId1': [
            {
                id: '1',
                title: 'HTML&CSS',
                status: TaskStatuses.New,
                startDate: '',
                addedDate: '',
                deadline: '',
                description: '',
                priority: TaskPriorities.Low,
                order: 1,
                todoListId: 'todolistId1',
                completed: false
            },
            {
                id: '2',
                title: 'HTML&CSS',
                status: TaskStatuses.New,
                startDate: '',
                addedDate: '',
                deadline: '',
                description: '',
                priority: TaskPriorities.Low,
                order: 1,
                todoListId: 'todolistId1',
                completed: false
            },
        ],
        'todolistId2': [
            {
                id: '1',
                title: 'HTML&CSS',
                status: TaskStatuses.New,
                startDate: '',
                addedDate: '',
                deadline: '',
                description: '',
                priority: TaskPriorities.Low,
                order: 1,
                todoListId: 'todolistId1',
                completed: false
            },
            {
                id: '2',
                title: 'HTML&CSS',
                status: TaskStatuses.New,
                startDate: '',
                addedDate: '',
                deadline: '',
                description: '',
                priority: TaskPriorities.Low,
                order: 1,
                todoListId: 'todolistId1',
                completed: false
            },
        ]
    }
})

test('new array should be added when new todolist is added', () => {
    const action = addTodolistAC({id: '3', title: 'What to learn', addedDate: '', order: 1},)
    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {
    const action = removeTodolistAC('todolistId2')
    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState)
    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})
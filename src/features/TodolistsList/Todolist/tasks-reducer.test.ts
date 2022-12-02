import {addTaskAC, removeTaskAC, tasksReducer, updateTaskAC} from './tasks-reducer';
import {TasksStateType} from '../../../app/AppWithRedux';
import {TaskPriorities, TaskStatuses} from '../../../api/api';

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
test('correct tasks should be deleted from array', () => {


    const action = removeTaskAC('todolistId2', '2');
    const endState = tasksReducer(startState, action);

    expect(endState).toEqual({
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
            }
        ]
    })
})
//dont work
test('correct task should be added to array', () => {
    const action = addTaskAC('todolistId1', {
        id: '3',
        title: 'YO',
        status: TaskStatuses.New,
        startDate: '',
        addedDate: '',
        deadline: '',
        description: '',
        priority: TaskPriorities.Low,
        order: 1,
        todoListId: 'todolistId1',
        completed: false
    },);
    const endState = tasksReducer(startState, action);

    expect(endState).toStrictEqual({
        'todolistId1': [
            {
                id: '3',
                title: 'YO',
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
    });

    expect(startState['todolistId1'].length).toBe(2);
    expect(endState['todolistId1'].length).toBe(3);

});

test('correct task title should be changed in array', () => {
    const action = updateTaskAC('todolistId1', '2', {
        title: 'TOYO',
        status: TaskStatuses.New,
        startDate: '',
        deadline: '',
        description: '',
        priority: TaskPriorities.Low
    });

    const endState = tasksReducer(startState, action);

    expect(endState).toStrictEqual({
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
                title: 'TOYO',
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
    });


    expect(startState['todolistId1'][1].title).toBe('HTML&CSS');
    expect(endState['todolistId1'][1].title).toBe('TOYO');

});

test('correct task status should be added to array', () => {
    const action = updateTaskAC('todolistId1', '2', {
        title: 'HTML&CSS',
        status: TaskStatuses.Completed,
        startDate: '',
        deadline: '',
        description: '',
        priority: TaskPriorities.Low
    });
    const endState = tasksReducer(startState, action);
    expect(endState).toStrictEqual({
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
                status: TaskStatuses.Completed,
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
    });

    expect(startState['todolistId1'][1].status).toBe(TaskStatuses.New);
    expect(endState['todolistId1'][1].status).toBe(TaskStatuses.Completed);
});

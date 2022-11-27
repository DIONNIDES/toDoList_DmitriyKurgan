import {AppInitialStateType, appReducer, setAppErrorAC, setAppStatusAC} from './appReducer';

let startState: AppInitialStateType;

beforeEach(() => {
    startState = {
        error: null,
        status: 'idle'
    }
})
test('correct error should be added', () => {


    const action = setAppErrorAC('NEW ERROR');
    const endState = appReducer(startState, action);

    expect(endState).toEqual({
        status: 'idle',
        error: 'NEW ERROR'
    });
    expect(endState.error).toBe('NEW ERROR');
})

test('correct status should be set', () => {


    const action = setAppStatusAC('succeeded');
    const endState = appReducer(startState, action);

    expect(endState).toEqual({
        status: 'succeeded',
        error: null
    });
    expect(endState.status).toBe('succeeded');
})


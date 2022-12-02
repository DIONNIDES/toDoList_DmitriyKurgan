import {AppInitialStateType, appReducer, setAppErrorAC, setAppStatusAC, setIsInitialized} from './appReducer';

let startState: AppInitialStateType;

beforeEach(() => {
    startState = {
        error: null,
        status: 'idle',
        isInitialized: false
    }
})
test('correct error should be added', () => {
    const action = setAppErrorAC('NEW ERROR');
    const endState = appReducer(startState, action);
    expect(endState).toEqual({
        status: 'idle',
        error: 'NEW ERROR',
        isInitialized: false
    });
    expect(endState.error).toBe('NEW ERROR');
})

test('correct status should be set', () => {
    const action = setAppStatusAC('succeeded');
    const endState = appReducer(startState, action);
    expect(endState).toEqual({
        status: 'succeeded',
        error: null,
        isInitialized: false
    });
    expect(endState.status).toBe('succeeded');
})

test('App should be initialized', () => {
    const action = setIsInitialized(true);
    const endState = appReducer(startState, action);
    expect(endState).toEqual({
        status: 'idle',
        error: null,
        isInitialized: true
    });
    expect(endState.status).toBe('idle');
})


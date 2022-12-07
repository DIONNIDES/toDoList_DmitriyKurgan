import {AppThunk} from './store';
import {authAPI} from '../api/api';
import {handlerServerNetworkError, handleServerAppError} from '../utills/error-utills';
import {setIsLoggedIn} from '../features/login/auth-reducer';

export type AppInitialStateType = {
    status: RequestedStatusType
    error: string | null
    isInitialized: boolean
}

export type RequestedStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

const initialState: AppInitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}


export const appReducer = (state: AppInitialStateType = initialState, action: AppActionsType): AppInitialStateType => {
    switch (action.type) {
        case 'APP/SET-APP-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-APP-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-IS-INITIALIZED':
            return {...state, isInitialized: action.isInitialized}
        default:
            return state
    }
}

export const setAppStatusAC = (status: RequestedStatusType) => ({type: 'APP/SET-APP-STATUS', status} as const);
export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-APP-ERROR', error} as const);
export const setIsInitialized = (isInitialized: boolean) => ({type: 'APP/SET-IS-INITIALIZED', isInitialized} as const);

export const initializeAppTC = (): AppThunk => (dispatch, getState, extraArgument) => {
    authAPI.initializeApp()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedIn(true));
                dispatch( setAppStatusAC('succeeded'));
            } else {
                handleServerAppError(dispatch, res.data);
            }
            dispatch(setIsInitialized(true));
        })
        .catch((err:any) => {
            handlerServerNetworkError(dispatch, err)
        });
}

export type SetAppStatusACType = ReturnType<typeof setAppStatusAC>;
export type SetAppErrorACType = ReturnType<typeof setAppErrorAC>;
export type SetIsInitializedActionType = ReturnType<typeof setIsInitialized>;

type AppActionsType = SetAppStatusACType | SetAppErrorACType | SetIsInitializedActionType;


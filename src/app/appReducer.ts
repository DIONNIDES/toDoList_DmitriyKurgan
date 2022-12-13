import {AppThunk} from './store';
import {authAPI} from '../api/api';
import {handlerServerNetworkError, handleServerAppError} from '../utills/error-utills';
import {setIsLoggedIn} from '../features/login/auth-reducer';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type RequestedStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

const initialState = {
    status: 'idle' as RequestedStatusType,
    error: null as null|string,
    isInitialized: false
}

export const appSlice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setAppStatusAC(state, action: PayloadAction<{ status: RequestedStatusType }>) {
            state.status = action.payload.status
        },
        setAppErrorAC(state, action: PayloadAction<{ error: null|string }>) {
            state.error = action.payload.error
        },
        setIsInitialized(state, action: PayloadAction<{ isInitialized: boolean }>) {
            state.isInitialized = action.payload.isInitialized
        }
    }
})

export const appReducer = appSlice.reducer;
export const {setAppStatusAC,setAppErrorAC,setIsInitialized} = appSlice.actions;

//thunks
export const initializeAppTC = (): AppThunk => (dispatch, getState, extraArgument) => {
    authAPI.initializeApp()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedIn({value: true}));
                dispatch(setAppStatusAC({status: 'succeeded'}));
            } else {
                handleServerAppError(dispatch, res.data);
            }
            dispatch(setIsInitialized({isInitialized: true}));
        })
        .catch((err: any) => {
            handlerServerNetworkError(dispatch, err)
        });
}



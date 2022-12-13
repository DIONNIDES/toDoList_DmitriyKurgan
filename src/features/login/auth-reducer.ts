import {AppThunk} from '../../app/store';
import {authAPI, LoginParamsType} from '../../api/api';
import {handlerServerNetworkError, handleServerAppError} from '../../utills/error-utills';
import {setAppStatusAC} from '../../app/appReducer';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false
};



const authSlice = createSlice({
    name:'auth',
    initialState:initialState,
    reducers:{
        setIsLoggedIn(state, action:PayloadAction<{value:boolean}>){
            state.isLoggedIn = action.payload.value
        }
    }
})


export const authReducer = authSlice.reducer
export const {setIsLoggedIn} = authSlice.actions


//action creators
// export const setIsLoggedIn = (isLoggedIn: boolean) =>
//     ({type: 'AUTH/SET-IS-LOGGED-IN', payload: {isLoggedIn}} as const);


//thunk creators
export const loginTC = (formData: LoginParamsType): AppThunk => (dispatch, getState) => {
    dispatch(setAppStatusAC({status:'loading'}));
    authAPI.login(formData)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedIn({value:true}));
                dispatch(setAppStatusAC({status:'succeeded'}));
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch(err => {
            handlerServerNetworkError(dispatch, err);
        })
}

export const logoutTC = (): AppThunk => (dispatch, getState) => {
    dispatch(setAppStatusAC({status:'loading'}));
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedIn({value:false}));
                dispatch(setAppStatusAC({status:'succeeded'}));
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch(err => {
            handlerServerNetworkError(dispatch, err);
        })
}



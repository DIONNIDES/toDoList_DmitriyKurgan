import {AppThunk} from '../../app/store';
import {authAPI, LoginParamsType} from '../../api/api';
import {handlerServerNetworkError, handleServerAppError} from '../../utills/error-utills';
import {setAppStatusAC} from '../../app/appReducer';

const initialState: InitialStateType = {
    isLoggedIn: false
};

export const authReducer = (state: InitialStateType = initialState, action: AuthActionsType): InitialStateType => {
    switch (action.type) {
        case 'AUTH/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.payload.isLoggedIn}
        default:
            return state
    }
}
//action creators
export const setIsLoggedIn = (isLoggedIn: boolean) =>
    ({type: 'AUTH/SET-IS-LOGGED-IN', payload: {isLoggedIn}} as const);


//thunk creators
export const loginTC = (formData: LoginParamsType): AppThunk => (dispatch, getState) => {
    dispatch(setAppStatusAC('loading'));
    authAPI.login(formData)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedIn(true));
                dispatch(setAppStatusAC('succeeded'));
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch(err => {
            handlerServerNetworkError(dispatch, err);
        })
}

export const logoutTC = (): AppThunk => (dispatch, getState) => {
    dispatch(setAppStatusAC('loading'));
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedIn(false));
                dispatch(setAppStatusAC('succeeded'));
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch(err => {
            handlerServerNetworkError(dispatch, err);
        })
}


//TYPES
type InitialStateType = {
    isLoggedIn: boolean
};

type SetIsLoggedInActionType = ReturnType<typeof setIsLoggedIn>;
type AuthActionsType = SetIsLoggedInActionType
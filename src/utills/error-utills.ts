import {setAppErrorAC, setAppStatusAC} from '../app/appReducer';
import {Dispatch} from 'redux';
import {ResponseType} from '../api/api';

export const handleServerAppError = <D>(dispatch:Dispatch, data:ResponseType<D>) =>{
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]));
    } else {
        dispatch(setAppErrorAC("Some error!"));
    }
    dispatch(setAppStatusAC('failed'));
}

export const handlerServerNetworkError = (dispatch:Dispatch, error:{message:string}) =>{
    dispatch(setAppErrorAC(error.message ? error.message : 'Some error occurred'));
    dispatch(setAppStatusAC('failed'));
}
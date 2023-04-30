// import {Dispatch} from 'redux';
// import {ResponseType} from '../api/api';
//
// export const handleServerAppError = <D>(dispatch: Dispatch, data: ResponseType<D>) => {
//     if (data.messages.length) {
//         dispatch(setAppErrorAC({error:data.messages[0]}));
//     } else {
//         dispatch(setAppErrorAC({error:'Some error!'}));
//     }
//     dispatch(setAppStatusAC({status:'failed'}));
// }
//
// export const handlerServerNetworkError = (dispatch: Dispatch, error: { message: string }) => {
//     dispatch(setAppErrorAC(error.message ? {error:error.message} : {error:'Some error occurred'}));
//     dispatch(setAppStatusAC({status:'failed'}));
// }


export  {}
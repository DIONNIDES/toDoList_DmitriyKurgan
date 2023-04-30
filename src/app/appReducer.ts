import {AsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {authAPI} from "../api/authAPI";

export type RequestedStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';
type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>
const initialState = {
    status: 'idle' as RequestedStatusType,
    error: null as null | string,
    isInitialized: false,
}

export const appSlice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        // setAppStatusAC(state, action: PayloadAction<{ status: RequestedStatusType }>) {
        //     state.status = action.payload.status
        // },
        // setAppErrorAC(state, action: PayloadAction<{ error: null | string }>) {
        //     state.error = action.payload.error
        // },
        // setIsInitialized(state, action: PayloadAction<{ isInitialized: boolean }>) {
        //     state.isInitialized = action.payload.isInitialized
        // }
    }, extraReducers: builder => {
        builder
            .addMatcher(
                (action): action is GenericAsyncThunk => action.type.endsWith('/rejected'),
                (state, action) => {
                    state.status = 'failed'
                    state.error = action.payload.data.error
                    state.isInitialized = false
                }
            )
            .addMatcher(
                (action): action is GenericAsyncThunk => action.type.endsWith('/fulfilled'),
                (state) => {
                    state.status = 'succeeded'
                    state.error = null
                }
            )
            .addMatcher(
                (action): action is GenericAsyncThunk => action.type.endsWith('/pending'),
                (state) => {
                    state.status = 'loading'
                    state.error = null
                }
            )
            //me
            .addMatcher(authAPI.endpoints.initializeApp.matchFulfilled,
                (state,{payload}) => {
                    state.isInitialized = true
                }
            )
    }
})

export const appReducer = appSlice.reducer;

//thunks
// export const initializeAppTC = (): AppThunk => (dispatch, getState, extraArgument) => {
//     authAPI.initializeApp()
//         .then(res => {
//             if (res.data.resultCode === 0) {
//                 dispatch(setIsLoggedIn({value: true}));
//                 dispatch(setAppStatusAC({status: 'succeeded'}));
//             } else {
//                 handleServerAppError(dispatch, res.data);
//             }
//             dispatch(setIsInitialized({isInitialized: true}));
//         })
//         .catch((err: any) => {
//             handlerServerNetworkError(dispatch, err)
//         });
// }



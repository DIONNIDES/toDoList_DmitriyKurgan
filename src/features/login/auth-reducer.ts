import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {authAPI} from "../../api/authAPI";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false
    } as InitialStateType,
    reducers: {
        setIsLoggedIn(state, action: PayloadAction<{ value: boolean }>) {
            state.isLoggedIn = action.payload.value
        }
    },
    extraReducers: builder => {
        builder
            //login
            .addMatcher(authAPI.endpoints.login.matchFulfilled,
                (state, {payload}) => {
                    state.isLoggedIn = true
                }
            )
            //logout
            .addMatcher(authAPI.endpoints.logout.matchFulfilled,
                (state, {}) => {
                    state.isLoggedIn = false
                }
            )
            .addMatcher(authAPI.endpoints.initializeApp.matchFulfilled,
                (state, {payload}) => {
                    if (payload.resultCode === 0) {
                        state.isLoggedIn = true
                    }
                }
            )
    }
})


export const authReducer = authSlice.reducer
export const {setIsLoggedIn} = authSlice.actions

//types
type InitialStateType = {
    isLoggedIn: boolean
};

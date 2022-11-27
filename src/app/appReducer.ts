export type AppInitialStateType = {
    status: RequestedStatusType
    error:string | null
}

export type RequestedStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

const initialState: AppInitialStateType = {
    status: 'idle',
    error: null
}



export const appReducer = (state: AppInitialStateType = initialState, action: AppActionsType):AppInitialStateType => {
    switch (action.type) {
        case 'APP/SET-APP-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-APP-ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}

export const setAppStatusAC = (status: RequestedStatusType) => ({type: 'APP/SET-APP-STATUS', status} as const);
export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-APP-ERROR', error} as const);

export type SetAppStatusACType = ReturnType<typeof setAppStatusAC>;
export type SetAppErrorACType = ReturnType<typeof setAppErrorAC>;

type AppActionsType = SetAppStatusACType | SetAppErrorACType;


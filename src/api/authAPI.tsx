import {ILoginParams, ResponseType} from "./todolistAPI";
import {apiSlice} from "./apiSlice";

export const authAPI = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation<ResponseType<{ userId?: string }>, ILoginParams>({
            query: (body) => ({
                url: `auth/login`,
                method: 'POST',
                body: {
                    email: body.email,
                    password: body.password,
                    rememberMe: body.rememberMe,
                }
            }),
            invalidatesTags: () => [{type: 'Auth'}]
        }),
        logout: build.mutation<ResponseType, any>({
            query: () => ({
                url: `auth/login`,
                method: 'DELETE',
            }),
            invalidatesTags: () => [{type: 'Auth'}]
        }),
        initializeApp: build.query<ResponseType<{ id: number, email: string, login: string }>, null>({
            query: () => ({
                url: `auth/me`,
                method: 'GET',
            }),
            providesTags: () => [{type: 'Auth'}]
        }),
    }),
})

export const {useLoginMutation, useLogoutMutation, useInitializeAppQuery} = authAPI;
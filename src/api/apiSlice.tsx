import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
            baseUrl: 'https://social-network.samuraijs.com/api/1.1/',
            credentials: 'include',
            headers: {
                'API-KEY': '4b505e77-20a4-4b88-91c9-9a97e6bfb421'
            },
        }
    ),
    tagTypes: ['Todolists', 'Tasks', 'Auth'],
    endpoints: () => ({}),
})

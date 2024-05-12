import { apiSlice } from './apiSlice.ts';
const USERS_URL = '/api/users/';

// Injects it into apislice
export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/auth`,
                method: 'POST',
                body: data
            })
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/`,
                method: 'POST',
                body: data
            })
        }),
        logout: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/logout`,
                method: 'POST',
                body: data
            })
        }),
        update: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/profile`,
                method: 'PUT',
                body: data
            })
        })


    })
});

export const { useLoginMutation, useUpdateMutation, useLogoutMutation, useRegisterMutation } = usersApiSlice;
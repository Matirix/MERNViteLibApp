import { apiSlice } from './apiSlice.ts';
const USERS_URL = '/api/users/';


interface LoginRequest {
    email: string;
    password: string;
}

interface RegisterRequest {
    email: string;
    password: string;
}

interface LoginResponse {
    _id: string;
    email: string;
}

export interface ApiError {
    status: number;
    data: {
        message: string;
    }
}




// Injects it into apislice
export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (data) => ({
                url: `${USERS_URL}/auth`,
                method: 'POST',
                body: data
            })
        }),
        register: builder.mutation<LoginResponse, RegisterRequest>({
            query: (data) => ({
                url: `${USERS_URL}/`,
                method: 'POST',
                body: data
            })
        }),
        logout: builder.mutation<void, void>({
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
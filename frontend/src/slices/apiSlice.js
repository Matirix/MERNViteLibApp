import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

/// Prefedfiend in vite config
const baseQuery = fetchBaseQuery({baseUrl: ''});

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['User'],
    endpoints: (builder) => ({

    })
})
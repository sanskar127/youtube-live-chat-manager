import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AccessTokenResponse, parametersType } from '../types/authToken'

// Define a service using a base URL and expected endpoints
export const authTokenApi = createApi({
    reducerPath: 'authToken',
    baseQuery: fetchBaseQuery({
        baseUrl: "https://oauth2.googleapis.com"
    }),
    // url: '/token',
    endpoints: (builder) => ({
        fetchAccessToken: builder.mutation<AccessTokenResponse, parametersType>({
            query: ({auth_code, client_id, client_secret, redirect_uri}) => ({
                url: '/token',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    grant_type: 'authorization_code',
                    code: auth_code,
                    redirect_uri: redirect_uri,
                    client_id: client_id,
                    client_secret: client_secret,
                }).toString(),
            }),
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useFetchAccessTokenMutation } = authTokenApi
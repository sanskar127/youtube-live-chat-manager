import { useEffect, useState } from "react"
import { accessTokenParamsType, authCodeParamsType, useAuthTokenType } from "../types/authToken"
import { getGoogleAuthCode } from "../utils/googleOAuth"
import { useFetchAccessTokenMutation } from "../api/googleApi"

export const useAuthToken = () => {
    // State Hook to store auth code received from getGoogleAuthCode Promise
    const [authCode, setAuthCode] = useState<string>("")

    useEffect(() => {
        // Parameters passed to receive the Authorization code from google api for mentioned scopes
        const authCodeParams: authCodeParamsType = {
            client_id: import.meta.env.VITE_CLIENT_ID,
            redirect_uri: `${window.location.origin}/auth/callback`,
            scope: 'profile email',
        }
        // This Function returns a Promise to receive auth code
        getGoogleAuthCode(authCodeParams)
            .then((code) => setAuthCode(code))
            .catch((error: Error) => console.log(error))

    }, [])


    const [fetchAccessToken, { data, isSuccess, error, isLoading }] = useFetchAccessTokenMutation();

    useEffect(() => {
        const accessTokenParams: accessTokenParamsType = {
            client_id: import.meta.env.VITE_CLIENT_ID,
            redirect_uri: `${window.location.origin}/auth/callback`,
            auth_code: authCode,
            client_secret: import.meta.env.VITE_CLIENT_SECRET,
        }

        fetchAccessToken(accessTokenParams)
    }, [authCode, fetchAccessToken])

    const handleAuthToken = (): void => {
        if (isSuccess) {
            console.log(data)
        }
    }

    return { handleAuthToken, isLoading, error }
} 
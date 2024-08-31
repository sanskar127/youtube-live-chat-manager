import { useState } from "react"
import { useFetchAccessTokenMutation } from "../api/googleApi"
import { getGoogleAuthCode } from "../utils/googleOAuth"

const UseAuthToken: React.FC = () => {
    const [fetchAccessToken, { isLoading, data, error }] = useFetchAccessTokenMutation()

    const [authCode, setAuthCode] = useState<string>("")

    const authCodeParams = {
        client_id: import.meta.env.VITE_CLIENT_ID,
        redirect_uri: `${window.location.origin}/auth/callback`,
        response_type: 'code',
        scope: 'profile email',
    }
    
    const accessTokenParams = {
        auth_code: authCode,
        client_id: import.meta.env.VITE_CLIENT_ID,
        client_secret: import.meta.env.VITE_CLIENT_SECRET,
        redirect_uri: `${window.location.origin}/auth/callback`
    }

    getGoogleAuthCode(authCodeParams)
        .then((data) => setAuthCode(data))
        .catch(error => console.log(error))
}

export { UseAuthToken }

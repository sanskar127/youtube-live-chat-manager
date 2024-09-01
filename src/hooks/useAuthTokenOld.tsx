// import { useState } from "react"
// import { useFetchAccessTokenMutation } from "../api/googleApi"
// import { getGoogleAuthCode } from "../utils/googleOAuth"

// const UseAuthToken: React.FC = () => {
//     const [authCode, setAuthCode] = useState<string>("")
//     const accessTokenParams = {
//         auth_code: authCode,
//         client_id: import.meta.env.VITE_CLIENT_ID,
//         client_secret: import.meta.env.VITE_CLIENT_SECRET,
//         redirect_uri: `${window.location.origin}/auth/callback`
//     }
//     const { data, error, isLoading } = useFetchAccessTokenMutation(accessTokenParams)


//     const authCodeParams = {
//         client_id: import.meta.env.VITE_CLIENT_ID,
//         redirect_uri: `${window.location.origin}/auth/callback`,
//         response_type: 'code',
//         scope: 'profile email',
//     }

//     getGoogleAuthCode(authCodeParams)
//         .then((token) => setAuthCode(token))
//         .catch(error => console.log(error))

//     const handleAuthToken = async () => {
//         try {
//         }
//     }
// }

// export { UseAuthToken }

import { useState, useEffect } from "react";
import { useFetchAccessTokenMutation } from "../api/googleApi";
import { getGoogleAuthCode } from "../utils/googleOAuth";
// import { AccessTokenResponse, AuthTokenError } from "../types/authToken";

const useAuthToken = () => {
    const [authCode, setAuthCode] = useState<string | null>("");
    const [fetchAccessToken, { data, isSuccess, error, isLoading }] = useFetchAccessTokenMutation();

    const authCodeParams = {
        client_id: import.meta.env.VITE_CLIENT_ID,
        redirect_uri: `${window.location.origin}/auth/callback`,
        response_type: 'code',
        scope: 'profile email',
    };

    useEffect(() => {
        getGoogleAuthCode(authCodeParams)
            .then((token:string | null) => setAuthCode(token))
            .catch((error: Error) => console.error(error));
    }, []);

    useEffect(() => {
        if (authCode) {
            const accessTokenParams = {
                auth_code: authCode,
                client_id: import.meta.env.VITE_CLIENT_ID,
                client_secret: import.meta.env.VITE_CLIENT_SECRET,
                redirect_uri: `${window.location.origin}/auth/callback`
            };
            fetchAccessToken(accessTokenParams);
        }
    }, [authCode, fetchAccessToken]);

    const handleAuthToken = async (): Promise<void> => {
        try {
            if(isSuccess) {
                localStorage.setItem("auth_token", JSON.stringify(data))
            } else {
                throw new Error("Auth Token Generation Failed")
            }

        } catch (e) {
            console.error("Error handling auth token:", e)
        }
    }

    handleAuthToken()

    return (
        <div>
            {/* Render your component UI here */}
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {data && <p>Access Token: {data}</p>}
        </div>
    );
};

export default useAuthToken


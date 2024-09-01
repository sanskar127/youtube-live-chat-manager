export interface AccessTokenResponse {
    access_token: string;
    expires_in: number;
    id_token: string;
    scope: string;
    token_type: string;
    refresh_token: string; // optional
}

export interface AuthTokenError {
    message: string
}

export interface parametersType {
    auth_code: string;
    client_id: string;
    client_secret: string;
    redirect_uri: string;
}

export interface authCodeParamsType {
    client_id: string
    redirect_uri: string
    scope: string
}

export interface accessTokenParamsType {
    client_id: string,
    redirect_uri: string,
    auth_code?: string,
    client_secret: string,
}

export interface AuthCodeType {
    (params: {
        client_id: string,
        redirect_uri: string,
        scope: string
    }): Promise<string>,
}

export interface useAuthTokenType {
    (): object
}
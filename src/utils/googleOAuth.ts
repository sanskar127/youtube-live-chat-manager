// // src/utils/googleAuth.ts
// const CLIENT_ID = import.meta.env.VITE_CLIENT_ID
// const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET
// const REDIRECT_URI = `${window.location.origin}/auth/callback` // Replace with your redirect URI
// const RESPONSE_TYPE = 'code' // Or 'code' if you prefer to handle authorization codes

// interface apiInterface {
//   (params: {
//     client_id: string,
//     redirect_uri: string,
//     response_type: string,
//     scope: string
//   }): string,
// }

// export const handleClick: apiInterface = ({ client_id, redirect_uri, response_type, scope}) => {
//   const baseUrl = 'https://accounts.google.com/o/oauth2/v2/auth'
//   // const scope = 'https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email'

//   const authUrl = `${baseUrl}?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=${response_type}&scope=${encodeURIComponent(scope)}&include_granted_scopes=true`

//   const width = 500;
//   const height = 600;
//   const left = (window.innerWidth / 2) - (width / 2);
//   const top = (window.innerHeight / 2) - (height / 2);

//   const authWindow = window.open(
//     authUrl,
//     'googleOAuthPopup',
//     `width=${width},height=${height},top=${top},left=${left},scrollbars=yes,resizable=yes`
//   )

//   return authWindow.onload = () => {
//     const url = authWindow.location.href;
//     const searchParams = new URL(url).searchParams;
//     const code = searchParams.get('code')
//     authWindow.close()
//     return code
//   }
// }

// export const fetchAccessToken = async (authCode: string) => {
//   const response = await fetch("https://oauth2.googleapis.com/token", {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded'
//     },
//     body: new URLSearchParams({
//       grant_type: 'authorization_code',
//       code: authCode,
//       redirect_uri: REDIRECT_URI,
//       client_id: CLIENT_ID,
//       client_secret: CLIENT_SECRET
//     })
//   });

//   const data = await response.json();
//   // return data.access_token;
//   console.log(data)
// }

interface AuthCodeInterface {
  (params: {
    client_id: string,
    redirect_uri: string,
    response_type: string,
    scope: string
  }): Promise<string | null>,
}

export const getGoogleAuthCode: AuthCodeInterface = ({ client_id, redirect_uri, response_type, scope }) => {
  const baseUrl = 'https://accounts.google.com/o/oauth2/v2/auth';

  const authUrl = `${baseUrl}?client_id=${client_id}&redirect_uri=${encodeURIComponent(redirect_uri)}&response_type=${response_type}&scope=${encodeURIComponent(scope)}&include_granted_scopes=true`;

  const width = 500;
  const height = 600;
  const left = (window.innerWidth / 2) - (width / 2);
  const top = (window.innerHeight / 2) - (height / 2);

  return new Promise<string | null>((resolve, reject) => {
    const authWindow = window.open(
      authUrl,
      'googleOAuthPopup',
      `width=${width},height=${height},top=${top},left=${left},scrollbars=yes,resizable=yes`
    );

    if (!authWindow) {
      return reject(new Error('Unable to open popup window'));
    }

    const interval = setInterval(() => {
      if (authWindow.closed) {
        clearInterval(interval);
        resolve(null); // User closed the popup
      } else {
        try {
          // Check if the popup URL contains the authorization code
          const url = authWindow.location.href;
          const searchParams = new URL(url).searchParams;
          const code = searchParams.get('code');
          if (code) {
            clearInterval(interval);
            authWindow.close();
            resolve(code); // Resolve the promise with the authorization code
          }
        } catch (e) {
          // Handle errors (e.g., cross-origin issues)
          console.log(e)
        }
      }
    }, 1000); // Check every second
  });
};

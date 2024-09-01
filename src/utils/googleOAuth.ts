import { AuthCodeType } from "../types/authToken";

export const getGoogleAuthCode: AuthCodeType = ({ client_id, redirect_uri, scope }) => {
  const baseUrl = 'https://accounts.google.com/o/oauth2/v2/auth';

  const authUrl = `${baseUrl}?client_id=${client_id}&redirect_uri=${encodeURIComponent(redirect_uri)}&response_type=code&scope=${encodeURIComponent(scope)}&include_granted_scopes=true`;

  const width = 500;
  const height = 600;
  const left = (window.innerWidth / 2) - (width / 2);
  const top = (window.innerHeight / 2) - (height / 2);

  return new Promise<string>((resolve, reject) => {
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
        return reject(new Error('OAuth Window Unexpectedly Closed!')); // User closed the popup
      } else {
        try {
          const url = authWindow.location.href;
          const searchParams = new URL(url).searchParams;
          const code = searchParams.get('code');
          if (code) {
            clearInterval(interval);
            authWindow.close();
            resolve(code); // Resolve the promise with the authorization code
          }
        } catch (e) {
          reject(e);
        }
      }
    }, 1000); // Check every second
  });
};

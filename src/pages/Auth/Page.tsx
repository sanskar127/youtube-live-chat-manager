import GoogleIcon from "../../assets/google.svg"
import { getGoogleAuthCode } from "../../utils/googleOAuth"

const Page = () => {
  // const CLIENT_ID = import.meta.env.VITE_CLIENT_ID
  // const REDIRECT_URI = 'http://localhost:5173/auth/callback' // Replace with your redirect URI
  // const RESPONSE_TYPE = 'code' // Or 'code' if you prefer to handle authorization codes
  // CLIENT_SECRET: import.meta.env.VITE_CLIENT_SECRET,
  // const scope = 'https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email'

  const params = {
    client_id: import.meta.env.VITE_CLIENT_ID,
    redirect_uri: `${window.location.origin}/auth/callback`,
    response_type: 'code',
    scope: 'profile email'
  }

  // const handleClick = () => {
  //   const callbackUrl = `${window.location.origin}/callback`;
  //   const googleClientId = import.meta.env.VITE_CLIENT_ID;
  //   const targetUrl = `https://accounts.google.com/o/oauth2/auth?redirect_uri=${encodeURIComponent(
  //     callbackUrl
  //   )}&response_type=token&client_id=${googleClientId}&scope=openid%20email%20profile`;
  //   window.location.href = targetUrl;
  // };

  const handleClick = () => {
    getGoogleAuthCode(params)
    .then(data => console.log(data))
    .catch(error => console.log(error))
  }

  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex flex-col items-center justify-center min-h-screen">
          <div className="p-8 rounded-lg shadow-lg max-w-md w-full">
            <h1 className="text-2xl font-semibold mb-4 text-center">Continue with Google</h1>
            <button
              onClick={handleClick}
              className="btn btn-neutral w-full flex items-center justify-center space-x-2"
            >
              <img src={GoogleIcon} alt="Google Icon" />
              <span className="text-base">Sign in with Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    // <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    //   <div className="p-8 rounded-lg shadow-lg max-w-md w-full">
    //     <h1 className="text-2xl font-semibold mb-4 text-center">Continue with Google</h1>
    //     <button
    //       // onClick={handleGoogleSignIn}
    //       className="btn btn-neutral w-full flex items-center justify-center space-x-2"
    //     >
    //       <img src={GoogleIcon} alt="Google Icon" />
    //       <span className="text-base">Sign in with Google</span>
    //     </button>
    //   </div>
    // </div>
  )
}

export default Page

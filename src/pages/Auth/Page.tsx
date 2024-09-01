// import { useNavigate } from "react-router-dom"
import GoogleIcon from "../../assets/google.svg"
import { useAuthToken } from "../../hooks/useAuthToken"

const Page = () => {
  const { handleAuthToken } = useAuthToken()
  
  const handleClick = () => {
    handleAuthToken()

  }

  return (
    <div>
      <div className="hero min-h-screen">
        <div className="hero-content flex flex-col items-center justify-center min-h-screen">
          <div className="p-8 rounded-lg shadow-lg max-w-md w-full bg-base-200">
            <h1 className="text-2xl font-semibold mb-4 text-center">Continue with Google</h1>
            <button className="btn btn-neutral w-full flex items-center justify-center space-x-2" onClick={handleClick()}>
              <img src={GoogleIcon} alt="Google Icon" />
              <span className="text-base">Sign in with Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page

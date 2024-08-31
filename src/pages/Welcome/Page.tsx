import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import type { RootState } from '../../app/store'

const Page = () => {
  const tutorialStatus = useSelector((state: RootState) => state.commonSlice.tutorial)
  const navigate = useNavigate()

  const handleClick = () => {
    if (tutorialStatus) { navigate("tutorial/") }
    else { navigate("auth/") }
  }
  
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md min-w-l">
          <h1 className="text-5xl font-bold py-6">Welcome Boss!</h1>
          <button className="btn btn-primary" onClick={handleClick}>Get Started</button>
        </div>
      </div>
    </div>
  )
}

export default Page

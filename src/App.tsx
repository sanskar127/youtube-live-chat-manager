import { Route, Routes } from "react-router-dom"
import { Auth, Tutorial, Welcome } from "./pages/index"

const App = () => {
  return (
    <div className="w-1/3 h-screen m-auto">
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/tutorial" element={<Tutorial />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </div>
  )
}

export default App

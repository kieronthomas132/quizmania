import './index.css'
import Main from "./components/main/main.tsx";
import {Route, Routes} from "react-router";
import Score from "./components/quiz/score.tsx";

const App = () => {
  return (
      <div>
          <Routes>
              <Route path='/' element={<Main/>}/>
              <Route path='/score' element={<Score/>}/>
          </Routes>
      </div>
  )
}

export default App

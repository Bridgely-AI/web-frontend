import { BrowserRouter, Routes, Route} from 'react-router-dom'

import LandingPage from './routes/LandingPage'
import Home from './routes/Home'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/inicio' element={<LandingPage/>} />
        <Route path='/' element={<Home/>} />
        <Route path='*' element={<h1>Error 404</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

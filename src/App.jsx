import { BrowserRouter, Routes, Route} from 'react-router-dom'

import LandingPage from './routes/LandingPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<h1>Bom dia</h1>} />
        <Route path='/inicio' element={<LandingPage/>} />
        <Route path='*' element={<h1>Error 404</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

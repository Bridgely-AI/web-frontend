import { BrowserRouter, Routes, Route} from 'react-router-dom'
import { AuthProvider } from './contexts/authContext'

import LandingPage from './routes/LandingPage'
import Home from './routes/Home'
import Register from './routes/Register'
import Login from './routes/Login'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/inicio' element={<LandingPage/>} />
          <Route path='/' element={<Home/>} />
          <Route path='/registro' element={<Register/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='*' element={<h1>Error 404</h1>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App

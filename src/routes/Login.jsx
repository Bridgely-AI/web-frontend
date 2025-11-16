import React, { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import BridgelyLogo from '../assets/images/bridgelyLogo.png'
import Navbar from '../components/Navbar'

const Login = () => {
  const navigate = useNavigate()
  const [userName, setuserName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  	const HandleLogin = async (e) => {
		try {
			const response = await axios.post(`${API_URL}/login`, { userName, password })
			const token = response.data.token

			if (token) {
				login(token)
				setError('Login realizado com sucesso!')
				setTimeout(() => navigate('/noticias'), 1000)
			}
			else {
				setError('Erro ao autenticar Token.')
			}
		} 
		catch (error) {
			console.error('Erro ao logar', error)
			setError(error.response.data?.message || `Erro ${error.response.status}: Falha na autenticação.`)
		}
	}

  return (
    <div className='bg-bg w-screen min-h-screen'>
      <Navbar/>
      <main className='w-full h-full flex'>
        <div className='w-6/10 h-screen hidden lg:flex items-center justify-center'>
          <img src={BridgelyLogo} alt="" className='w-80'/>
        </div>
        <div className='bg-bg-elevated w-4/10 h-screen flex flex-col items-center justify-center p-8 pt-20'>
          <p className='w-full text-text text-5xl font-bold'>Boas vindas!</p>
          <p className='w-full text-text text-2xl'>
            Não tem uma conta? 
            <Link to={'/registro'} 
              className='text-accent border-b-1 animate-all hover:text-accent/70'>
                Cadastre-se
            </Link></p>
        </div>
      </main>
    </div>
  )
}

export default Login
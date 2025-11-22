  import React, { useState, useRef } from 'react'
  import { Link, useNavigate } from 'react-router-dom'
  import axios from 'axios'
  import { API_URL } from '../config/apiConfig'
  import useAuth from '../hooks/useAuth'

  import BridgelyLogo from '../assets/images/bridgelyLogo.png'
  import Navbar from '../components/Navbar'

  const Login = () => {
    const { login } = useAuth()
    const navigate = useNavigate()
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const isLoginValid = userName.trim() !== '' && password.trim() !== ''

    const containerStyle = 'w-full flex items-center rounded-lg border-2 border-secondary'
    const inputStyle = 'peer text-text text-lg w-full px-2.5 py-2 rounded-xl z-1 focus:outline-none'
    const labelStyle = 'absolute bg-bg-elevated text-lg text-text-secondary ml-2 px-2 rounded-lg z-0 transition-all duration-200 ease-out peer-focus:-translate-y-4 peer-focus:text-lg peer-focus:text-text peer-not-placeholder-shown:-translate-y-4 peer-not-placeholder-shown:text-md peer-not-placeholder-shown:pb-4'
    const nextButtonStyle = 'bg-secondary text-text text-3xl font-extrabold py-2 mt-8 rounded-lg transition-all duration-300 hover:scale-105 hover:bg-linear-to-r hover:from-secundary/60 hover:to-primary/30'

    const HandleLogin = async (e) => {
      try {
        const response = await axios.post(`${API_URL}/login`, { userName, password })
        const token = response.data.token

        if (token) {
          login(token)
          setError('Login realizado com sucesso!')
          setTimeout(() => navigate('/'), 1000)
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
        <Navbar />
        <main className='w-full h-full flex'>
          <div className='w-6/10 h-screen hidden md:flex items-center justify-center'>
            <img src={BridgelyLogo} alt="" className='w-80' />
          </div>
          <div className='bg-bg-elevated w-full md:w-4/10 h-screen flex flex-col items-center justify-center p-4 md:p-8 pt-20'>
            <p className='w-full text-text text-5xl font-bold'>Boas vindas!</p>
            <p className='w-full text-text text-2xl'>
              Não tem uma conta?
              <Link to={'/registro'}
                className='text-accent border-b ml-4 animate-all hover:text-accent/70'>
                Cadastre-se
              </Link>
            </p>
            <div className='w-full space-y-5'>
              <div className={`${containerStyle} mt-10`}>
                <input type="text" placeholder=' ' value={userName}
                  onChange={e => setUserName(e.target.value)}
                  className={inputStyle} />
                <label className={labelStyle}>
                  Nome ou email
                </label>
              </div>
              <div className={`${containerStyle}`}>
                <input type="email" placeholder=' ' value={password}
                  onChange={e => setPassword(e.target.value)}
                  className={inputStyle} />
                <label className={labelStyle}>
                  Senha
                </label>
              </div>
              <button
                onClick={() => { if (isLoginValid) HandleLogin() }}
                disabled={!isLoginValid}
                className={`w-full mt-3 ${nextButtonStyle} ${isLoginValid
                  ? 'bg-secondary hover:bg-opacity-90 text-text cursor-pointer'
                  : 'bg-secondary/50 text-text-secondary cursor-not-allowed'
                  }`}>
                Avançar
              </button>
              {error && (
                <div className="w-full bg-red-500/20 border border-red-500 text-red-400
                      text-center py-3 px-4 rounded-lg animate-fadeIn">
                  {error}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    )
  }

  export default Login
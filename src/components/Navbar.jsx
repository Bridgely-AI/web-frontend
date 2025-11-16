import React, { useState } from 'react'
import { motion } from "motion/react"
import { Link, useNavigate } from 'react-router-dom'
import useDarkMode from '../hooks/useDarkMode'
import useAuth from '../hooks/useAuth'

import { FiMoon, FiSun } from "react-icons/fi"
import { HiOutlineChevronDown } from 'react-icons/hi'

import BridgelyLogo from '../assets/images/bridgelyLogo.png'

const Navbar = ({ setNavButtons = true, currentPage = '' }) => {
   const { user, logout, isAuthenticated } = useAuth()
   const { isDarkMode, toggleDarkMode, disableDarkMode, enableDarkMode } = useDarkMode()
   const navigate = useNavigate()

   const [isMenuOpen, setIsMenuOpen] = useState(false)
   const [isNavButtons, setIsNavButtons] = useState(setNavButtons)
   const [activeNavButton, setActiveNavButton] = useState(currentPage)

   const handleLogout = () => {
      logout()
      setIsMenuOpen(false)
      navigate('/')
   }

   const authButtons = () => {
      if (isAuthenticated == 1) {
         return (
            <div className='relative flex items-center'>
               <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className='flex items-center space-x-2 px-2 py-1 rounded-xl transition-all duration-300 hover:bg-bg/90'>
                  <img className='h-16 rounded-full' src={user?.photo} alt={user?.name || 'Perfil'} />
                  <HiOutlineChevronDown className={`w-4 h-4 text-text transition-transform ${isMenuOpen ? 'transform rotate-180' : ''}`} />
               </button>

               {isMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-bg-elevated border border-secondary/50 rounded-lg shadow-xl py-2 z-20">
                     <Link
                        to={`/profile/${user.id}`}
                        className="block px-4 py-2 text-text hover:bg-bg/50"
                        onClick={() => setIsMenuOpen(false)}>
                        Ver Perfil ({user.type === 'user' ? 'Profissional' : 'Empresa'})
                     </Link>
                     <div className="h-px bg-secondary/20 my-1"></div>
                     <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-red-400 hover:bg-red-400/10"
                     >
                        Sair (Logout)
                     </button>
                  </div>
               )}
            </div>
         )
      }
      return (
         <>
            <Link
               to={'/login'}
               className="bg-secondary text-text text-xl font-bold py-2 px-6 rounded-full shadow-lg cursor-pointer transition duration-300 transform hover:scale-105">
               Login
            </Link>
            <Link
               to={'/registro'}
               className="bg-bg text-text text-xl font-bold py-2 px-6 rounded-full hover:text-secondary cursor-pointer transition duration-300 transform hover:scale-105">
               Registro
            </Link>
         </>
      )
   }


   return (
      <nav className="bg-bg-elevated fixed w-screen h-20 flex justify-between items-center px-8 py-2 z-10">
         <div className="flex items-center">
            <Link to={'/'} className='flex items-center cursor-pointer'>
               <img src={BridgelyLogo} alt="Bridgely Logo" className="h-16 mr-2" />
               {currentPage == '' || currentPage == 'login' || currentPage == 'register' ?
                  <span className="text-text text-3xl font-bold">Bridgely</span>
                  : ''}
            </Link>
            {isNavButtons ?
               <div className='flex items-center space-x-4 ml-10 cursor-pointer'>
                  <Link
                     to={'/'}
                     className={`text-xl font-light ${activeNavButton == 'home' ? 'text-secondary' : 'text-text'}`}>
                     Home
                  </Link>
                  <Link
                     to={'/'}
                     className={`text-xl font-light ${activeNavButton == 'estudo' ? 'text-secondary' : 'text-text'}`}>
                     Estudos
                  </Link>
               </div>
               : ''}
         </div>
         <div className="flex items-center space-x-4">
            <button
               onClick={toggleDarkMode}
               className='relative bg-bg h-11 flex items-center mr-10 rounded-full'>
               <div className='relative text-text text-md font-medium flex items-center gap-1 px-3 md:pl-3 md:pr-3.5 py-3 md:py-1.5 z-11 cursor-pointer transition-all'>
                  <FiSun className='relative text-lg md:text-md z-11' />
               </div>
               <div className='relative text-text text-md font-medium flex items-center gap-1 px-3 md:pl-3 md:pr-3.5 py-3 md:py-1.5 cursor-pointer z-11 transition-all'>
                  <FiMoon className='relative text-lg md:text-md z-11' />
               </div>
               <div className={`absolute inset-0 flex ${isDarkMode === true ? 'justify-end' : 'justify-start'}`}>
                  <motion.span
                     layout
                     transition={{ type: "spring", damping: 25, stiffness: 250 }}
                     className="h-full w-1/2 rounded-full bg-linear-to-r from-primary to-secondary" />
               </div>
            </button>
            {authButtons()}
         </div>
      </nav>
   )
}

export default Navbar
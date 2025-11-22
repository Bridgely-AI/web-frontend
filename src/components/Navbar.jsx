import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from "motion/react"
import { Link, useNavigate } from 'react-router-dom'
import useDarkMode from '../hooks/useDarkMode'
import useAuth from '../hooks/useAuth'

import { FiMoon, FiSun, FiMenu, FiX } from "react-icons/fi"
import { HiOutlineChevronDown } from 'react-icons/hi'

import BridgelyLogo from '../assets/images/bridgelyLogo.png'

const Navbar = ({ setNavButtons = true, currentPage }) => {
   const { user, logout, isAuthenticated } = useAuth()
   const { isDarkMode, toggleDarkMode, disableDarkMode, enableDarkMode } = useDarkMode()
   const navigate = useNavigate()

   const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

   const [isMenuOpen, setIsMenuOpen] = useState(false)
   const [isNavButtons, setIsNavButtons] = useState(setNavButtons)
   const [activeNavButton, setActiveNavButton] = useState(currentPage)

   useEffect(() => {
      setActiveNavButton(currentPage)
   }, [currentPage])

   const handleLogout = () => {
      logout()
      setIsMenuOpen(false)
      navigate('/')
   }

   const NavLinks = ({ mobile = false }) => (
      <>
         <Link
            to={'/'}
            onClick={() => setIsMobileMenuOpen(false)}
            className={`text-xl font-light transition-all hover:text-secondary/60 ${activeNavButton === 'home' ? 'text-secondary font-bold' : 'text-text'} ${mobile ? 'py-2 border-b border-secondary/10 w-full text-center' : ''}`}>
            Home
         </Link>

         {user?.type !== 'company' && (
            <Link
               to={'/estudos'}
               onClick={() => setIsMobileMenuOpen(false)}
               className={`text-xl font-light transition-all hover:text-secondary/60 ${activeNavButton === 'study' ? 'text-secondary font-bold' : 'text-text'} ${mobile ? 'py-2 border-b border-secondary/10 w-full text-center' : ''}`}>
               Estudos
            </Link>
         )}

         <Link
            to={'/inbox'}
            onClick={() => setIsMobileMenuOpen(false)}
            className={`text-xl font-light transition-all hover:text-secondary/60 ${activeNavButton === 'inbox' ? 'text-secondary font-bold' : 'text-text'} ${mobile ? 'py-2 w-full text-center' : ''}`}>
            Mensagens
         </Link>
      </>
   )
   const authButtons = () => {
      if (isAuthenticated) {
         return (
            <div className='relative hidden md:flex items-center'>
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
      <nav className="bg-bg-elevated fixed w-screen h-20 flex justify-between items-center px-6 md:px-8 py-2 z-10">
         <div className="flex items-center">
            <Link to={'/'} className='flex items-center cursor-pointer'>
               <img src={BridgelyLogo} alt="Bridgely Logo" className="h-16 mr-2" />
               {currentPage == '' || currentPage == 'login' || currentPage == 'register' ?
                  <span className="text-text text-3xl font-bold">Bridgely</span>
                  : ''}
            </Link>
            {isNavButtons && (
               <div className='hidden md:flex items-center space-x-4 ml-10 cursor-pointer'>
                  <NavLinks />
               </div>
            )}
         </div>
         <div className="hidden md:flex items-center space-x-4">
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

         <div className="md:hidden z-50 flex items-center">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-text text-3xl focus:outline-none">
               {isMobileMenuOpen ? <FiX /> : <FiMenu />}
            </button>
         </div>

         <AnimatePresence>
            {isMobileMenuOpen && (
               <motion.div
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="fixed inset-0 bg-bg-elevated z-40 flex flex-col pt-24 px-6 md:hidden"
               >
                  {isAuthenticated ? (
                     <div className="flex flex-col items-center mb-8 pb-6 border-b border-secondary/20">
                        <img
                           className='h-20 w-20 rounded-full object-cover border-2 border-secondary mb-3'
                           src={user?.photo || 'http://localhost:5002/userImages/userPhotoPlaceholder.png'}
                           alt={user?.name}
                        />
                        <p className='text-xl text-text font-bold'>{user?.name}</p>
                        <p className='text-sm text-text-secondary capitalize mb-4'>{user?.type === 'company' ? 'Empresa' : 'Profissional'}</p>

                        <div className="flex gap-4 w-full">
                           <Link
                              to={`/profile/${user.id}`}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="flex-1 bg-secondary/10 border border-secondary text-secondary text-center py-2 rounded-lg font-bold">
                              Perfil
                           </Link>
                           <button
                              onClick={handleLogout}
                              className="flex-1 bg-red-500/10 border border-red-500 text-red-500 py-2 rounded-lg font-bold">
                              Sair
                           </button>
                        </div>
                     </div>
                  ) : (
                     <div className="flex flex-col gap-4 mb-8 pb-6 border-b border-secondary/20">
                        <Link to={'/login'} onClick={() => setIsMobileMenuOpen(false)} className="w-full text-center border border-secondary text-text font-bold py-3 rounded-xl">Login</Link>
                        <Link to={'/registro'} onClick={() => setIsMobileMenuOpen(false)} className="w-full text-center bg-secondary text-text font-bold py-3 rounded-xl shadow-lg">Registro</Link>
                     </div>
                  )}

                  <div className="flex flex-col justify-center gap-4 items-center mb-8">
                     {isNavButtons && <NavLinks mobile={true} />}
                  </div>

                  <div className="mt-auto mb-10 flex items-center justify-center">
                     <button
                        onClick={toggleDarkMode}
                        className='relative bg-bg h-12 flex items-center rounded-full'>
                        <div className='relative text-text text-xl font-medium flex items-center gap-1 px-3 md:pl-3 md:pr-3.5 py-3 md:py-1.5 z-11 cursor-pointer transition-all'>
                           <FiSun className='relative text-2xl md:text-md z-11' />
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
                  </div>
               </motion.div>
            )}
         </AnimatePresence>
      </nav>
   )
}

export default Navbar
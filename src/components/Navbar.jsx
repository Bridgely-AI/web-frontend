import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useDarkMode from '../hooks/useDarkMode'
import { motion } from "motion/react"
import { FiMoon, FiSun } from "react-icons/fi"

import BridgelyLogo from '../assets/images/bridgelyLogo.png'

const Navbar = ({ setNavButtons = true, currentPage = '' }) => {
   const [isNavButtons, setIsNavButtons] = useState(setNavButtons)
   const [activeNavButton, setActiveNavButton] = useState(currentPage)
   const { isDarkMode, toggleDarkMode, disableDarkMode, enableDarkMode } = useDarkMode()

   return (
      <nav className="bg-bg-elevated fixed w-screen flex justify-between items-center px-8 py-2 z-10">
         <div className="flex items-center">
            <Link to={'/'} className='flex items-center cursor-pointer'>
               <img src={BridgelyLogo} alt="Bridgely Logo" className="h-16 mr-2" />
               {currentPage == 'home' || currentPage == 'login' || currentPage == 'register' ?
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
         <div className="flex space-x-4">
            <button
               onClick={toggleDarkMode}
               className='relative bg-bg flex items-center mr-10 rounded-full'>
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
            <button className="bg-secondary text-text text-xl font-bold py-2 px-6 rounded-full shadow-lg cursor-pointer transition duration-300 transform hover:scale-105">
               Login
            </button>
            <Link
               to={'/registro'}
               className="bg-bg text-text text-xl font-bold py-2 px-6 rounded-full hover:text-secondary cursor-pointer transition duration-300 transform hover:scale-105">
               Registro
            </Link>
         </div>
      </nav>
   )
}

export default Navbar
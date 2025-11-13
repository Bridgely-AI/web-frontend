import React, { useState, useEffect } from 'react'

import BridgelyLogo from '../assets/images/bridgelyLogo.png'

import Navbar from '../components/Navbar'

const LandingPage = () => {
   const [gradientPosition, setGradientPosition] = useState(50)

   useEffect(() => {
      const handleMouseMove = (event) => {
         const x = ((event.clientX / window.innerWidth) * 100 * 3.6) / 4 + 135
         setGradientPosition(x)
      }
      window.addEventListener('mousemove', handleMouseMove)

      return () => {
         window.removeEventListener('mousemove', handleMouseMove)
      }
   }, [])

   return (
      <div className="min-h-screen flex flex-col items-center justify-start text-white relative"
           style={{ background: `linear-gradient(${gradientPosition}deg, rgba(var(--bg), 0.8) 0%, rgba(var(--bg), 1) 100%), rgb(var(--bg))`}}>
         <div></div>

         <Navbar/>
         <main className='flex flex-col items-center justify-center grow text-center p-6 -mt-20'>
            <img src={BridgelyLogo} alt="logo" className='w-60 drop-shadow-[0_0_40px_rgba(var(--secondary),0.2)]' />
            <h1 className="text-text text-5xl md:text-6xl font-extrabold mb-6 max-w-3xl leading-tight">
               A ponte para os trabalhos do futuro.
            </h1>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
               <button className="bg-secondary text-text font-bold py-2 px-8 rounded-full shadow-lg cursor-pointer transition duration-300 transform hover:scale-105">
                  Comece sua jornada
               </button>
               <button className="border-2 border-secondary text-text font-bold py-2 px-8 rounded-full cursor-pointer hover:text-secondary transition duration-300 transform hover:scale-105">
                  Para empresas
               </button>
            </div>
         </main>
      </div>
   )
}

export default LandingPage
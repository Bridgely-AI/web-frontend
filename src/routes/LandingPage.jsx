import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import BridgelyLogo from '../assets/images/bridgelyLogo.png'
import { BiRocket, BiBrain, BiNetworkChart } from "react-icons/bi"

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

   const features = [
      {
         icon: <BiNetworkChart />,
         title: "Conexões Reais",
         desc: "Conecte-se diretamente com empresas que buscam o seu talento.",
         color: "text-secondary"
      },
      {
         icon: <BiBrain />,
         title: "IA Inteligente",
         desc: "Receba planos de estudo personalizados baseados no seu perfil.",
         color: "text-primary"
      },
      {
         icon: <BiRocket />,
         title: "Impulsione",
         desc: "Ferramentas exclusivas para acelerar sua jornada profissional.",
         color: "text-accent"
      }
   ]

   return (
      <div className="min-h-screen flex flex-col items-center justify-start text-text relative overflow-x-hidden"
         style={{ background: `linear-gradient(${gradientPosition}deg, rgba(var(--bg), 0.8) 0%, rgba(var(--bg), 1) 100%), rgb(var(--bg))` }}>
         <div></div>

         <Navbar setNavButtons={false} />
         <section className='flex flex-col items-center justify-center grow text-center p-6 mt-20'>
            <img src={BridgelyLogo} alt="logo" className='w-60 drop-shadow-[0_0_40px_rgba(var(--secondary),0.2)]' />
            <h1 className="text-text text-5xl md:text-6xl font-extrabold mb-6 max-w-3xl leading-tight">
               A ponte para os trabalhos do futuro.
            </h1>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
               <Link to={'/'} className="bg-secondary text-text font-bold py-2 px-8 rounded-full shadow-lg cursor-pointer transition duration-300 transform hover:scale-105">
                  Comece sua jornada
               </Link>
               <Link
                  to={'/registro'}
                  className="border-2 border-secondary text-text font-bold py-2 px-8 rounded-full cursor-pointer hover:text-secondary transition duration-300 transform hover:scale-105">
                  Para empresas
               </Link>
            </div>
         </section>
         <section className='bg-bg-elevated pb-20 pt-10 px-6 my-10 md:px-20 rounded-4xl'>
            <div className='max-w-6xl mx-auto'>
               <h2 className='text-3xl md:text-4xl font-bold text-center mb-16 text-text'>
                  Por que a <span className='text-secondary'>Bridgely?</span>
               </h2>

               <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                  {features.map((item, index) => (
                     <div
                        key={index}
                        className='bg-bg-elevated/40 backdrop-blur-sm border border-secondary/20 p-8 rounded-3xl 
                                   flex flex-col items-center text-center transition duration-300 
                                   hover:-translate-y-2 hover:shadow-xl hover:border-secondary/50 group'
                     >
                        <div className={`text-6xl mb-6 ${item.color} drop-shadow-lg transition duration-300 group-hover:scale-110`}>
                           {item.icon}
                        </div>
                        <h3 className='text-2xl font-bold text-text mb-3'>{item.title}</h3>
                        <p className='text-text-secondary text-lg leading-relaxed'>
                           {item.desc}
                        </p>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         <footer className='w-full py-8 text-center text-text-secondary text-sm border-t border-secondary/10'>
            <p>© 2025 Bridgely. Construindo conexões.</p>
         </footer>
      </div>
   )
}

export default LandingPage
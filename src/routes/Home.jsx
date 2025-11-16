import { useState } from 'react'

import Navbar from '../components/Navbar'

const Home = () => {
   const filters = ["Oportunidades", "Empresas", "Perfis"]
   const [activeFilter, setActiveFilter] = useState('oportunidades')
   const [searchTerm, setSearchTerm] = useState('')

   return (
      <div>
         <Navbar currentPage='home' setNavButtons={false} />
         <div className='bg-linear-to-b from-bg/98 to-bg w-screen min-h-screen text-text flex flex-col items-center p-4 md:p-8'>
            <div className='w-md h-min bg-linear-to-tr from-primary/60 to-primary/30 flex flex-col items-center p-2 mt-15 rounded-2xl'>
               <h2 className='text-3xl font-extrabold'>Sua jornada personalizada</h2>
               <div className='h-20'>

               </div>
               <button className='bg-secondary text-text text-xl font-bold py-2 px-6 rounded-xl shadow-lg cursor-pointer transition duration-300 transform hover:scale-105'>
                  Iniciar Jornada
               </button>
            </div>
            <div className="w-2/5 flex my-8">
               <input
                  type="text"
                  placeholder="Buscar perfis, empresas ou empregos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-4 border-transparent focus:border-primary bg-text text-bg rounded-l-xl shadow-lg outline-none transition duration-300"
               />
               <button className="bg-secondary text-text p-4 rounded-r-xl shadow-lg cursor-pointer hover:bg-secondary/90 transition">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                     <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zM9.5 14C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                  </svg>
               </button>
            </div>
            <div className="flex space-x-8 text-xl font-semibold">
               {filters.map((filter) => (
                  <button
                     key={filter}
                     onClick={() => setActiveFilter(filter)}
                     className={`pb-1 transition duration-300
                            ${activeFilter.charAt(0).toUpperCase() + String(activeFilter).slice(1) == filter
                           ? 'text-text px-2 rounded-lg shadow-md shadow-accent'
                           : 'text-text-secondary px-2 rounded-lg hover:text-text'
                        }
                        `}>
                     {filter}
                  </button>
               ))}
            </div>
         </div>
      </div>
   )
}

export default Home
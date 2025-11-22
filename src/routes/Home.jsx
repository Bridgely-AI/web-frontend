import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../config/apiConfig'
import useAuth from '../hooks/useAuth'

import Navbar from '../components/Navbar'
import { BiBriefcase, BiBuilding, BiUser, BiStar, BiMap } from 'react-icons/bi'

const Home = () => {
   const { user, isAuthenticated } = useAuth()

   const tabs = [
      { id: 'jobs', label: 'Oportunidades', icon: <BiBriefcase /> },
      { id: 'companies', label: 'Empresas', icon: <BiBuilding /> },
      { id: 'profiles', label: 'Profissionais', icon: <BiUser /> }
   ]
   const [activeTab, setActiveTab] = useState('jobs')
   const [searchTerm, setSearchTerm] = useState('')
   const [feedData, setFeedData] = useState([])
   const [loading, setLoading] = useState(false)
   const [error, setError] = useState('')

   useEffect(() => {
      setError('')
      const fetchData = async () => {
         if (!isAuthenticated) return
         setLoading(true)

         try {
            const token = localStorage.getItem('token')
            const response = await axios.get(`${API_URL}/feed/${activeTab}`, {
               headers: { Authorization: `Bearer ${token}` }
            })
            setFeedData(response.data)
         }
         catch (error) {
            console.error(error)
            setError('Erro ao carregar o feed.')
         }
         finally {
            setLoading(false)
         }
      }
      fetchData()
   }, [activeTab, isAuthenticated])

   const filteredData = feedData.filter(item => {
      const search = searchTerm.toLowerCase()
      const matchesLocation = item.location?.toLowerCase().includes(search)

      if (activeTab === 'jobs') {
         return item.title?.toLowerCase().includes(search) ||
            item.companyName?.toLowerCase().includes(search) ||
            item.description?.toLowerCase().includes(search) ||
            matchesLocation
      }
      if (activeTab == 'profiles') {
         const matchesSkills = item.hardSkills?.some(skill => skill.toLowerCase().includes(search))

         return item.name?.toLowerCase().includes(search) ||
            item.actualArea?.toLowerCase().includes(search) ||
            matchesLocation ||
            matchesSkills
      }
      return item.name?.toLowerCase().includes(search) ||
         (item.area || item.actualArea || '').toLowerCase().includes(search) ||
         matchesLocation
   })

   return (
      <div>
         <Navbar currentPage='home' />
         <div className='bg-linear-to-b from-bg/98 to-bg min-h-screen text-text flex flex-col items-center p-4 md:p-8'>
            <div className='w-full max-w-md h-min bg-linear-to-tr from-primary/60 to-primary/30 flex flex-col items-center p-2 mt-15 rounded-2xl'>
               <h2 className='text-3xl text-center font-extrabold'>Sua jornada personalizada</h2>
               <div className='h-20 flex items-center justify-center'>
                  <p className='text-text-secondary text-center'>Estude com uma IA personalizada para adquirir seu emprego do futuro!</p>
               </div>
               <Link
                  to='/estudos'
                  className='bg-secondary text-text text-xl font-bold py-2 px-6 rounded-xl shadow-lg cursor-pointer transition duration-300 transform hover:scale-105'>
                  Iniciar Jornada
               </Link>
            </div>
            <div className="w-full max-w-2xl flex my-8">
               <input
                  type="text"
                  placeholder={`Buscar ${tabs.find(t => t.id === activeTab).label.toLowerCase()}...`}
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
            <div className="w-full flex flex-wrap justify-center gap-3 md:gap-8 text-base md:text-xl font-semibold">
               {tabs.map((tab) => (
                  <button
                     key={tabs.id}
                     onClick={() => setActiveTab(tab.id)}
                     className={`flex items-center gap-2 px-4 py-2 transition duration-300
                            ${activeTab == tab.id
                           ? 'text-accent px-2 rounded-lg shadow-md shadow-accent'
                           : 'text-text-secondary px-2 rounded-lg hover:text-text'
                        }`}>
                     {tab.icon} {tab.label}
                  </button>
               ))}
            </div>

            <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 pb-20">
               {loading ? (
                  <p className="col-span-full text-center text-text-secondary">Carregando feed...</p>
               ) : !isAuthenticated ? (
                  <p className="col-span-full text-center text-text-secondary">Faça login para poder ver as oportunidades, empresas e profissionais.</p>
               ) : error != '' ? (
                  <p className="col-span-full text-center text-text-secondary">{error}</p>
               ) : filteredData.length === 0 ? (
                  <p className="col-span-full text-center text-text-secondary">Nenhum resultado encontrado.</p>
               ) : (
                  filteredData.map((item, index) => (
                     <div
                        key={index}
                        className="bg-bg-elevated h-full flex flex-col p-6 rounded-2xl shadow-lg border border-text-secondary/10 
                                    transition duration-300 hover:border-secondary/50 hover:-translate-y-1">
                        <div className="flex flex-col md:flex-row items-start justify-between mb-4">
                           <div className="flex items-center gap-3">
                              <img
                                 src={item.photo || item.companyPhoto || 'http://localhost:5002/userImages/userPhotoPlaceholder.png'}
                                 alt="Avatar"
                                 className="w-12 h-12 rounded-full object-cover border border-secondary/30 bg-bg"
                              />
                              <div>
                                 <h3 className="font-bold text-lg text-text leading-tight">
                                    {activeTab === 'jobs' ? item.title : item.name}
                                 </h3>
                                 <p className="text-sm text-secondary">
                                    {activeTab === 'jobs' ? item.companyName : (item.actualArea || item.area)}
                                 </p>

                                 {item.location && (
                                    <div className="flex items-center gap-1 text-xs text-text-secondary mt-1">
                                       <BiMap className="shrink-0" /> 
                                       <span className="truncate">{item.location}</span>
                                    </div>
                                 )}
                              </div>
                           </div>
                           <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded text-xs font-bold text-primary">
                              {activeTab === 'jobs' ? (
                                 <span>{item.matchScore > 0 ? 'Match ✨' : 'Nova'}</span>
                              ) : (
                                 <>
                                    <BiStar /> {item.recommendations?.count || 0}
                                 </>
                              )}
                           </div>
                        </div>
                        <p className="text-text-secondary text-sm mb-6 line-clamp-3 grow">
                           {item.description || "Sem descrição disponível."}
                        </p>

                        {activeTab === 'profiles' && item.hardSkills && item.hardSkills.length > 0 && (
                           <div className="flex flex-wrap gap-2 mb-4">
                              {item.hardSkills.slice(0, 3).map((skill, i) => (
                                 <span key={i} className="bg-secondary/10 text-secondary text-xs px-2 py-1 rounded-md border border-secondary/20">
                                    {skill}
                                 </span>
                              ))}
                              {item.hardSkills.length > 3 && (
                                 <span className="text-xs text-text-secondary py-1">+{item.hardSkills.length - 3}</span>
                              )}
                           </div>
                        )}

                        <div className="mt-auto">
                           {activeTab === 'jobs' ? (
                              <a
                                 href={item.link}
                                 target="_blank"
                                 rel="noopener noreferrer"
                                 className="block w-full text-center bg-secondary/10 border border-secondary text-secondary py-2 rounded-xl font-bold hover:bg-secondary hover:text-white transition"
                              >
                                 Aplicar Agora
                              </a>
                           ) : (
                              <Link
                                 to={`/profile/${item.id}`}
                                 className="block w-full text-center bg-primary/10 border border-primary text-primary py-2 rounded-xl font-bold hover:bg-primary hover:text-white transition"
                              >
                                 Ver Perfil
                              </Link>
                           )}
                        </div>
                     </div>
                  ))
               )}
            </div>
         </div>
      </div>
   )
}

export default Home
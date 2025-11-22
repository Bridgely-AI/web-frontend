import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import useAuth from '../hooks/useAuth'
import { API_URL } from '../config/apiConfig'

import Navbar from '../components/Navbar'
import MessageModal from '../components/MessageModal'
import UserProfile from '../components/UserProfile'
import CompanyProfile from '../components/CompanyProfile'

import { BiLike, BiSolidLike } from "react-icons/bi"
import { MdMessage } from "react-icons/md"
import { FaEdit } from "react-icons/fa"
import { FaPlus } from "react-icons/fa6"

const Profile = () => {
   const { id: profileId } = useParams()
   const { user: currentUser, loading: authLoading } = useAuth()

   const [profileData, setProfileData] = useState(null)
   const [loading, setLoading] = useState(true)

   const [hasRecommended, setHasRecommended] = useState(false)
   const [isMessageModalOpen, setIsMessageModalOpen] = useState(false)
   const [messageForm, setMessageForm] = useState({ subject: '', content: '' })

   const [isEditing, setIsEditing] = useState(false)
   const [edits, setEdits] = useState({})
   const [error, setError] = useState(null)

   const isOwner = currentUser && (parseInt(profileId) == currentUser.id)

   const handleRecommended = async () => {
      try {
         const response = await axios.post(`${API_URL}/profile/recommend/${profileId}`, {}, {
            headers: {
               Authorization: `Bearer ${localStorage.getItem('token')}`
            }
         })

         const newCount = response.data.newCount

         setProfileData(prevData => ({
            ...prevData,
            recommendations: {
               ...prevData.recommendations,
               count: newCount
            },
         }))

         setHasRecommended(!hasRecommended)
      }
      catch (error) {
         console.error('Erro ao recomendar perfil: ', error.response || error)
         alert('Erro ao processar a recomendação. Tente novamente mais tarde.')
      }
   }

   const handleStartEditing = () => {
      const baseEdits = {
         name: profileData.name,
         description: profileData.description,
         location: profileData.location,
         profilePicture: profileData.profilePicture,
      }
      if (profileData.type === 'company') {
         setEdits({
            ...baseEdits,
            area: profileData.area,
            website: profileData.website,
            jobs: profileData.jobs,
            futureJobs: profileData.futureJobs
         })
      }
      else {
         setEdits({
            ...baseEdits,
            actualArea: profileData.actualArea,
            hardSkills: profileData.hardSkills,
            softSkills: profileData.softSkills,
            experiences: profileData.experiences,
            hobbies: profileData.hobbies,
            academicBackground: profileData.academicBackground,
            email: profileData.email,
         })
      }
      setIsEditing(true)
   }
   const handleInputChange = (e) => {
      const { name, value } = e.target
      setEdits(prev => ({ ...prev, [name]: value }))
   }
   const handleEditAction = async (action = 'save') => {
      if (action == 'save') {
         try {
            const response = await axios.patch(`${API_URL}/profile/${profileId}`, edits, {
               headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`
               }
            })

            setProfileData(response.data.user)
            setIsEditing(false)
         }
         catch (error) {
            setError(error.response?.data?.message || "Erro ao salvar o perfil.")
            console.error("Erro ao salvar:", error)
         }
      }
      else if (action == 'cancel') {
         setEdits({})
         setIsEditing(false)
      }
   }

   const handleItemChange = (e, index, category) => {
      const newArray = [...edits[category]]
      newArray[index] = e.target.value
      setEdits(prev => ({ ...prev, [category]: newArray }))
   }
   const addItem = (category) => {
      setEdits(prev => ({
         ...prev,
         [category]: [...(prev[category] || []), '']
      }))
   }
   const removeItem = (index, category) => {
      setEdits(prev => ({
         ...prev,
         [category]: prev[category].filter((_, i) => i != index)
      }))
   }

   const handleComplexItemChange = (e, index, category, field) => {
      const newArray = [...edits[category]]
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      newArray[index] = { ...newArray[index], [field]: value }
      setEdits(prev => ({ ...prev, [category]: newArray }))
   }
   const addComplexItem = (category) => {
      const emptyItem = category === 'experiences'
         ? { role: '', company: '', description: '', startDate: '', endDate: '', isCurrent: false }
         : { course: '', degree: '', institution: '', status: '', startDate: '', endDate: '' }

      setEdits(prev => ({
         ...prev,
         [category]: [...(prev[category] || []), emptyItem]
      }))
   }
   const removeComplexItem = (index, category) => {
      setEdits(prev => ({
         ...prev,
         [category]: prev[category].filter((_, i) => i !== index)
      }))
   }

   const handleSendMessage = async (e) => {
      e.preventDefault()

      if (!messageForm.subject.trim() || !messageForm.content.trim()) {
         alert('Preencha o assunto e o conteudo da mensagem')
         return
      }

      const payload = {
         recipientId: profileId,
         subject: messageForm.subject,
         content: messageForm.content
      }
      const token = localStorage.getItem('token')

      try {
         const response = await axios.post(`${API_URL}/profile/message/${profileId}`, payload, {
            headers: {
               Authorization: `Bearer ${token}`
            }
         })

         alert(response.data.message)
         setIsMessageModalOpen(false)
         setMessageForm({ subject: '', content: '' })
      }
      catch (error) {
         console.error('Erro ao enviar a mensagem', error)
         const errorMessage = error.response?.data?.message || 'Erro ao conectar com o servidor.'
         alert(`Falha ao enviar: ${errorMessage}`)
      }
   }
   const handleFormChange = (e) => {
      const { name, value } = e.target
      setMessageForm(prev => ({ ...prev, [name]: value }))
   }

   useEffect(() => {
      if (!profileId) {
         setLoading(false)
         setError('ID do perfil não fornecido!')
         return
      }

      const fetchProfile = async () => {
         try {
            const response = await axios.get(`${API_URL}/profile/${profileId}`)
            setProfileData(response.data.user)
         }
         catch (error) {
            console.error('Erro ao buscar perfil: ', error.response || error)
            setError(error.response?.data?.message || 'Perfil não encontrado ou erro de carregamento.')
         }
         finally {
            setLoading(false)
         }
      }
      const checkIfRecommended = async () => {
         if (profileData && currentUser) {
            const recommenderUser = profileData.recommendations?.users || []
            const hasRecommended = recommenderUser.includes(currentUser.id)
            setHasRecommended(hasRecommended)
         }
         else {
            setHasRecommended(false)
         }
      }

      fetchProfile()
      checkIfRecommended()
   }, [profileId, currentUser])

   if (loading || authLoading) {
      return (
         <div className="w-screen h-screen bg-bg text-center text-red-500 font-bold">
            <Navbar />
            <p className='w-full h-full flex items-center justify-center text-2xl text-warning'>
               Carregando perfil...
            </p>
         </div>
      )
   }
   if (error) {
      return (
         <div className="w-screen h-screen bg-bg text-center text-red-500 font-bold">
            <Navbar />
            <p className='w-full h-full flex items-center justify-center text-2xl text-warning'>
               {error}
            </p>
         </div>
      )
   }
   if (!profileData) {
      return (
         <div className="w-screen h-screen bg-bg text-center text-red-500 font-bold">
            <Navbar />
            <p className='w-full h-full flex items-center justify-center text-2xl text-warning'>
               Perfil não encontrado.
            </p>
         </div>
      )
   }

   const {
      name,
      type,
      location,
      profilePicture,
      description,
      actualArea,
      hardSkills,
      softSkills,
      academicBackground,
      experiences,
      hobbies,
      recommendations
   } = profileData
   const formatDate = (dateString) => {
      if (!dateString) return 'Atual'
      const options = { year: 'numeric', month: 'short' }
      return new Date(dateString).toLocaleDateString('pt-BR', options)
   }
   const formatCount = (count) => {
      if (count >= 1000) {
         return (count / 1000).toFixed(1) + 'k'
      }
      return count
   }

   return (
      <div className='bg-bg w-full min-h-screen overflow-x-hidden'>
         <Navbar />
         <div className='w-full flex flex-col md:flex-row pt-20'>
            <main className='w-full md:w-7/8 pb-10 px-4 md:px-14 order-2 md:order-1'>
               <div className='relative bg-linear-to-r from-primary/90 to-primary/50 w-full h-60 flex justify-center md-4 md:mt-10 rounded-3xl'>
                  <div className='absolute bg-linear-to-t from-secondary to-accent p-1 rounded-full -bottom-12 md:-bottom-15'>
                     <img className='w-40 md:w-60 h-40 md:h-60 shadow-lg shadow-secondary/30 rounded-full' src={profilePicture} alt={name} />
                  </div>
               </div>

               <div className='mt-16 md:mt-20'>
                  {isEditing ?
                     (
                        <div className='w-full text-center space-y-6 mt-20'>
                           <div className='w-full flex justify-center gap-4'>
                              <button
                                 onClick={() => handleEditAction('save')}
                                 className='bg-secondary text-text text-xl font-bold py-2 px-6 rounded-full shadow-lg cursor-pointer transition duration-300 hover:scale-105'>
                                 Salvar
                              </button>
                              <button
                                 onClick={() => handleEditAction('cancel')}
                                 className='text-text text-xl font-bold py-2 px-6 rounded-full border border-secondary shadow-lg cursor-pointer transition duration-300 hover:scale-105'>
                                 Cancelar
                              </button>
                           </div>
                           <input
                              name='name'
                              value={edits.name}
                              onChange={(e) => handleInputChange(e)}
                              placeholder={'Insira seu nome completo'}
                              className='w-full md:w-7/10 text-text text-5xl font-bold px-4 py-2 border border-information rounded-2xl 
                                          outline-accent'/>
                           <input
                              name='actualArea'
                              value={edits.actualArea}
                              onChange={(e) => handleInputChange(e)}
                              placeholder={'Insira sua área de profissão atual'}
                              className='w-full md:w-4/10 text-text text-xl px-4 py-2 border border-information rounded-2xl 
                                          outline-accent'/>
                           <textarea
                              name='description'
                              value={edits.description}
                              onChange={(e) => handleInputChange(e)}
                              placeholder={'Insira uma descrição'}
                              className='w-full md:w-9/10 text-text text-lg px-6 py-2 border border-information rounded-2xl 
                                          outline-accent'></textarea>
                        </div>
                     ) :
                     (
                        <div className='w-full text-center mt-20'>
                           <p className='text-text text-5xl font-bold'>{name}</p>
                           <p className='text-secondary text-xl mt-2'>{actualArea}</p>
                           <p className='text-text-secondary text-lg px-40 mt-5'>{description}</p>
                        </div>
                     )}
               </div>

               <div className='h-px bg-text-secondary/50 mt-10'></div>

               {profileData.type === 'user' ? (
                  <UserProfile
                     isEditing={isEditing}
                     edits={edits}
                     profileData={profileData}
                     handleItemChange={handleItemChange}
                     addItem={addItem}
                     removeItem={removeItem}
                     handleComplexItemChange={handleComplexItemChange}
                     addComplexItem={addComplexItem}
                     removeComplexItem={removeComplexItem}
                     formatDate={formatDate}
                  />
               ) : (
                  <CompanyProfile
                     isEditing={isEditing}
                     edits={edits}
                     profileData={profileData}
                     handleComplexItemChange={handleComplexItemChange}
                     addComplexItem={addComplexItem}
                     removeComplexItem={removeComplexItem}
                     formatDate={formatDate}
                     handleInputChange={handleInputChange}
                  />
               )}
            </main>
            <aside className='w-full md:w-1/8 relative md:fixed  md:right-0 md:h-screen flex flex-col items-center gap-4 md:space-y-6 
                  text-text px-3 py-5 border-l-2 border-bg-elevated 
                  z-2'>
               <div className="w-full text-center pb-6 border-b border-text-secondary">
                  <div className='flex items-center justify-center space-x-2'>
                     <p className="text-4xl font-extrabold text-secondary">
                        {formatCount(recommendations?.count || 0)}
                     </p>
                     {!isOwner && (
                        <button
                           onClick={handleRecommended}
                           className={`flex items-center justify-center gap-2 text-xl p-2 rounded-full 
                              border-secondary border shadow-md shadow-secondary/20
                              transition duration-300
                              ${hasRecommended ? 'bg-secondary hover:bg-secondary/50' : 'bg-transparent hover:bg-secondary'}`}>
                           {hasRecommended ?
                              (<BiSolidLike />) :
                              (<BiLike />)
                           }
                        </button>
                     )}
                  </div>
                  <p className="text-sm font-medium text-text-secondary mt-1">
                     Recomendações
                  </p>
               </div>

               <div className="w-full space-y-4">
                  {!isOwner && (
                     <button
                        onClick={() => setIsMessageModalOpen(true)}
                        className="w-full flex items-center justify-center gap-2 px-2 py-3 rounded-lg 
                                 bg-primary/10 border border-primary/30 text-sm font-bold 
                                 transition duration-300 hover:bg-primary/20 hover:border-primary/40">
                        <MdMessage />
                        Enviar Mensagem
                     </button>
                  )}
                  {isOwner && (
                     <button
                        onClick={(e) => handleStartEditing(e)}
                        className="w-full flex items-center justify-center gap-2 px-2 py-3 rounded-lg 
                                 bg-accent/10 border border-accent/30 text-sm font-bold 
                                 transition duration-300 hover:bg-accent/20 hover:border-accent/40">
                        <FaEdit />
                        Editar Perfil
                     </button>
                  )}

               </div>
            </aside>
         </div >

         <MessageModal
            isMessageModalOpen={isMessageModalOpen}
            profileData={profileData}
            messageForm={messageForm}
            handleSendMessage={handleSendMessage}
            handleFormChange={handleFormChange}
            setIsMessageModalOpen={setIsMessageModalOpen} />
      </div >
   )
}

export default Profile
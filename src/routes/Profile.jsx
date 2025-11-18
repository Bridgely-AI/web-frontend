import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import useAuth from '../hooks/useAuth'
import { API_URL } from '../config/apiConfig'

import Navbar from '../components/Navbar'
import MessageModal from '../components/MessageModal'

import { BiLike, BiSolidLike } from "react-icons/bi"
import { MdMessage } from "react-icons/md"
import { FaEdit } from "react-icons/fa"

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
      setEdits({
         name: profileData.name,
         actualArea: profileData.actualArea,
         description: profileData.description,
         location: profileData.location,
         hardSkills: profileData.hardSkills,
         profilePicture: profileData.profilePicture,
         softSkills: profileData.softSkills,
         experiences: profileData.experiences,
         hobbies: profileData.hobbies,
         academicBackground: profileData.academicBackground
      })
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
      <div className='bg-bg max-w-screen min-h-screen overflow-hidden'>
         <Navbar />
         <div className='max-w-screen flex pt-20 overflow-hidden'>
            <main className='w-7/8 pb-10 px-14'>
               <div className='relative bg-linear-to-r from-primary/90 to-primary/50 w-full h-60 flex justify-center mt-10 rounded-3xl'>
                  <div className='absolute bg-linear-to-t from-secondary to-accent p-1 rounded-full -bottom-15'>
                     <img className='w-60 h-60 shadow-lg shadow-secondary/30 rounded-full' src={profilePicture} alt={name} />
                  </div>
               </div>

               <div className=''>
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
                                 className='text-text text-xl font-bold py-2 px-6 rounded-full border border-secondary shadow-lg cursor-pointer
                                 transition duration-300 hover:scale-105'>
                                 Cancelar
                              </button>
                           </div>
                           <input
                              name='name'
                              value={edits.name}
                              onChange={(e) => handleInputChange(e)}
                              placeholder={'Insira seu nome completo'}
                              className='w-7/10 text-text text-5xl font-bold px-4 py-2 border border-information rounded-2xl 
                           outline-accent'/>
                           <input
                              name='actualArea'
                              value={edits.actualArea}
                              onChange={(e) => handleInputChange(e)}
                              placeholder={'Insira sua área de profissão atual'}
                              className='w-4/10 text-text text-xl px-4 py-2 border border-information rounded-2xl 
                           outline-accent'/>
                           <textarea
                              name='description'
                              value={edits.description}
                              onChange={(e) => handleInputChange(e)}
                              placeholder={'Insira uma descrição'}
                              className='w-9/10 text-text text-lg px-6 py-2 border border-information rounded-2xl 
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

               <div className='h-full flex space-x-1 mt-5 text-text'>
                  <div className='w-3/10 mr-5 border-r border-text-secondary/50'>
                     <p className='text-xl font-medium'>Habilidades Técnicas (hard skills)</p>
                     <div className='flex flex-wrap gap-3 mt-4'>
                        {hardSkills && hardSkills.length > 0 ? (hardSkills.map((skill, index) => (
                           <span
                              key={index}
                              className='bg-secondary/10 text-secondary font-medium 
                              px-3 py-1 rounded-full border border-secondary 
                              transition duration-200 hover:bg-secondary/20'>
                              {skill}
                           </span>
                        ))) : (
                           <p className='text-text-secondary text-sm italic'>Nenhuma habilidade técnica listada.</p>
                        )}
                     </div>

                     <p className='text-xl font-medium mt-10'>Habilidades Comportamentais (soft skills)</p>
                     <div className='flex flex-wrap gap-3 mt-4'>
                        {softSkills && softSkills.length > 0 ? (softSkills.map((skill, index) => (
                           <span
                              key={index}
                              className='bg-primary/10 text-primary font-medium 
                              px-3 py-1 rounded-full border border-primary 
                              transition duration-200 hover:bg-primary/20'>
                              {skill}
                           </span>
                        ))) : (
                           <p className='text-text-secondary text-sm italic'>Nenhuma habilidade técnica listada.</p>
                        )}
                     </div>

                     <p className='text-xl font-medium mt-10'>Hobbies</p>
                     <div className='flex flex-wrap gap-2 mt-4'>
                        {hobbies?.map((hobby, index) => (
                           <span
                              key={index}
                              className='bg-accent/10 font-medium 
                              px-3 py-1 rounded-full border border-accent
                              transition duration-200 hover:bg-accent/20'>
                              {hobby}
                           </span>
                        )) || <p className='text-text-secondary text-sm italic'>N/A</p>}
                     </div>
                  </div>

                  <div className='w-6/10 ml-5 text-text'>
                     <h2 className='text-3xl font-extrabold text-text-primary mb-3'>Experiências Profissionais</h2>
                     <div className='space-y-6'>
                        {experiences && experiences.length > 0 ? (
                           experiences.map((exp, index) => (
                              <div key={index} className='p-6 bg-bg-elevated rounded-xl shadow-lg border border-secondary/10'>
                                 <h3 className='text-xl font-bold text-secondary'>{exp.role}</h3>
                                 <p className='text-lg font-medium'>{exp.company}</p>

                                 <p className='text-sm text-text-secondary mt-1'>
                                    {formatDate(exp.startDate)} — {exp.isCurrent ? 'Atual' : formatDate(exp.endDate)}
                                 </p>

                                 <p className='text-text-primary/90 mt-3'>{exp.description}</p>
                              </div>
                           ))
                        ) : (
                           <p className='text-text-secondary italic'>Nenhuma experiência profissional registrada.</p>
                        )}
                     </div>

                     <h2 className='text-3xl font-extrabold text-text-primary mt-10 mb-3'>Histórico Acadêmico</h2>
                     <div className='space-y-6'>
                        {academicBackground && academicBackground.length > 0 ? (
                           academicBackground.map((edu, index) => (
                              <div key={index} className='p-4 border-l-4 border-primary/70 bg-bg-elevated/50 rounded-lg'>
                                 <h3 className='text-xl font-bold text-secondary'>{edu.course} ({edu.degree})</h3>
                                 <p className='text-md'>{edu.institution}</p>

                                 <p className='text-sm text-text-secondary'>
                                    {formatDate(edu.startDate)} — {edu.status === 'Concluído' ? formatDate(edu.endDate) : 'Em andamento'}
                                 </p>
                                 <p className='text-sm text-information'>Status: {edu.status}</p>
                              </div>
                           ))
                        ) : (
                           <p className='text-text-secondary italic'>Nenhum histórico acadêmico registrado.</p>
                        )}
                     </div>
                  </div>
               </div>
            </main>
            <aside
               className='fixed right-0 w-1/8 h-screen flex flex-col items-center space-y-6 
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
import { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'
import useInbox from '../hooks/useInbox'
import axios from 'axios'
import { API_URL } from '../config/apiConfig'

import Navbar from '../components/Navbar'

import { MdMailOutline, MdDoneAll } from 'react-icons/md'

const Inbox = () => {
   const { isAuthenticated } = useAuth()
   const { messages, loading, error, setMessages } = useInbox(isAuthenticated)

   const [sendersMap, setSenderMap] = useState({})
   const [sendersLoading, setSendersLoading] = useState(false)

   const handleMarkAsRead = async (messageId) => {
      try {
         const updatedMessages = messages.map(msg => {
            if (msg.messageId == messageId) {
               return { ...msg, isRead: true }
            }
            return msg
         })
         setMessages(updatedMessages)
         const token = localStorage.getItem('token')
         await axios.patch(`${API_URL}/messages/read/${messageId}`, {}, {
            headers: { Authorization: `Bearer ${token}` }
         })
      } catch (error) {
         console.error("Erro ao marcar como lida:", error)
      }
   }

   useEffect(() => {
      if (messages.length == 0) return

      setSendersLoading(true)
      const uniqueSendersIds = [...new Set(messages.map(msg => msg.senderId))]

      const fetchSendersName = async () => {
         const map = {}
         for (const id of uniqueSendersIds) {
            try {
               const response = await axios.get(`${API_URL}/profile/${id}`)
               const senderProfile = response.data.user

               map[id] = { name: senderProfile.name, type: senderProfile.type }
            }
            catch (error) {
               map[id] = { name: `Usuário Desconhecido (${id})`, type: 'unknown' }
            }
         }
         setSenderMap(map)
         setSendersLoading(false)
      }
      fetchSendersName()
   }, [messages])

   if (!isAuthenticated) {
      return (
         <div className="bg-bg min-h-screen">
            <Navbar currentPage='inbox' />
            <p className='text-text-secondary text-center pt-25 p-8'>
               Faça login para ver sua caixa de entrada.
            </p>
         </div>
      )
   }

   return (
      <div className='bg-bg w-screen min-h-screen'>
         <Navbar currentPage='inbox' />
         <main className='text-text pt-25 p-8'>
            <p className='flex items-center justify-center gap-3 text-4xl text-secondary font-extrabold mb-8'>
               <MdMailOutline /> Caixa de entrada
            </p>
            {loading && <p className='text-text-secondary text-center'>Carregando mensagens...</p>}
            {error && <p className='text-error text-center'>Erro: {error}</p>}

            {!loading && messages.length === 0 && (
               <p className='text-text-secondary text-center mt-10 text-lg'>Sua caixa de entrada está vazia...</p>
            )}

            <div className='space-y-4 pb-6 border-b border-error'>
               <p className='text-2xl font-bold'>Novas mensagens:</p>
               <p className='pb-3'>(clique na mensagem para marcar como lida)</p>
               {messages.map((msg) => {
                  const sender = sendersMap[msg.senderId]
                  const senderName = sender?.name || `${msg.senderId}`

                  return (
                     <div
                        key={msg.messageId}
                        onClick={() => handleMarkAsRead(msg.messageId)}
                        className={`p-4 rounded-xl shadow-lg border cursor-pointer transition duration-300
                        ${msg.isRead ? 'hidden'
                              : 'bg-bg-elevated border-secondary/50 hover:bg-bg-elevated/60 hover:scale-101'}`}>

                        <div className='flex justify-between items-center'>
                           <p className='text-xl font-bold text-text'>{msg.subject}</p>
                           <span className='text-sm text-text-secondary'>{new Date(msg.timestamp).toLocaleDateString('pt-BR')}</span>
                        </div>
                        <p className='text-text-secondary mt-1 truncate'>{msg.content}</p>
                        <span className='text-xs text-information/80'>
                           De: {senderName} ({msg.senderType == 'company' ? ' Empresa' : 'Profissional'})</span>
                     </div>
                  )
               })}
            </div>

            <div className='space-y-4 pt-10'>
               {messages.map((msg) => {
                  const sender = sendersMap[msg.senderId]
                  const senderName = sender?.name || `${msg.senderId}`
                  return (
                     <div
                        key={msg.messageId}
                        className={`p-4 rounded-xl shadow-lg border transition duration-300
                     ${msg.isRead ? 'bg-bg-elevated border-secondary/50 hover:bg-bg-elevated/80'
                              : 'hidden'}`}>

                        <div className='flex justify-between items-center'>
                           <p className='text-xl font-bold text-text-secondary'>{msg.subject}</p>
                           <div className='flex items-center gap-2'>
                              <span className='text-sm text-text-secondary'>{new Date(msg.timestamp).toLocaleDateString('pt-BR')}</span>
                              <MdDoneAll className='text-primary' />
                           </div>
                        </div>
                        <p className='text-text-secondary mt-1 truncate'>{msg.content}</p>
                        <span className='text-xs text-information/80'>
                           De: {senderName} ({msg.senderType == 'company' ? 'Empresa' : 'Profissional'})</span>
                     </div>
                  )
               })}
            </div>
         </main>
      </div>
   )
}

export default Inbox
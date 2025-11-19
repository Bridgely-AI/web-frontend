import { useState, useEffect } from 'react'
import axios from 'axios'

import { API_URL } from '../config/apiConfig'

const useInbox = (isAuthenticated) => {
   const [messages, setMessages] = useState([])
   const [loading, setLoading] = useState(true)
   const [error, setError] = useState(null)

   useEffect(() => {
      if (!isAuthenticated) {
         setLoading(false)
         setMessages([])
         return
      }

      const fetchMessages = async () => {
         setLoading(true)
         try {
            const token = localStorage.getItem('token')
            const response = await axios.get(`${API_URL}/messages`, {
               headers: {
                  Authorization: `Bearer ${token}`
               }
            })
            setMessages(response.data.messages)
         }
         catch (error) {
            console.error('Erro ao buscar mensagens', error)
            setError('Falha ao carregar mensagens.')
         }
         finally {
            setLoading(false)
         }
      }
      fetchMessages()
   }, [isAuthenticated])

   return ({ messages, loading, error })
}

export default useInbox
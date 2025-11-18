import useAuth from '../hooks/useAuth'
import useInbox from '../hooks/useInbox'

import Navbar from '../components/Navbar'

import { MdMailOutline, MdDoneAll } from 'react-icons/md'

const Inbox = () => {
   const { isAuthenticated } = useAuth()
   const { messages, loading, error } = useInbox(isAuthenticated)

   const handleMarkAsRead = (messageId) => {
      console.log(`Marcando mensagem ${messageId} como lida.`)
   }
   if (!isAuthenticated) {
      return (
         <div className="bg-bg min-h-screen pt-20 p-8">
            <Navbar />
            <p className='text-text-secondary text-center mt-10'>
               Faça login para ver sua caixa de entrada.
            </p>
         </div>
      )
   }  

   return (
      <div>Inbox</div>
   )
}

export default Inbox
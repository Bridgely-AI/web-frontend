import React from 'react'

const MessageModal = ({isMessageModalOpen, profileData, messageForm, handleSendMessage, handleFormChange, setIsMessageModalOpen}) => {
   const isFormValid = messageForm.subject.trim() && messageForm.content.trim()

   if (!isMessageModalOpen) return null

   return (
      <div className="fixed inset-0 bg-bg/90 flex items-center justify-center z-2">

         <div className="bg-bg-elevated p-8 rounded-xl shadow-2xl w-full max-w-lg">
            <p className="text-2xl font-bold text-text mb-6">
               Enviar Mensagem para <p className='text-primary'>{profileData.name}</p>
            </p>

            <form onSubmit={handleSendMessage} className="space-y-4">
               <input
                  type="text"
                  name="subject"
                  value={messageForm.subject}
                  onChange={handleFormChange}
                  placeholder="Assunto (Ex: Interesse na vaga)"
                  className="w-full p-3 bg-bg border border-text-secondary/50 rounded-lg text-text focus:border-secondary outline-none"
                  required />

               <textarea
                  name="content"
                  value={messageForm.content}
                  onChange={handleFormChange}
                  placeholder="Escreva sua mensagem aqui..."
                  rows="5"
                  className="w-full p-3 bg-bg border border-text-secondary/50 rounded-lg text-text focus:border-secondary outline-none"
                  required
               />

               <div className="flex justify-end space-x-3 pt-4">
                  <button
                     type="button"
                     onClick={() => setIsMessageModalOpen(false)}
                     className="px-6 py-2 border border-secondary/50 text-text rounded-lg hover:bg-bg/20 hover:scale-104 transition">
                     Cancelar
                  </button>
                  <button
                     type="submit"
                     disabled={!isFormValid}
                     className={`px-6 py-2 rounded-lg font-bold transition duration-300 ${isFormValid
                        ? 'bg-secondary text-text hover:scale-104 hover:bg-secondary/90'
                        : 'bg-bg text-text-secondary cursor-not-allowed'
                        }`}>
                     Enviar
                  </button>
               </div>
            </form>
         </div>
      </div>
   )
}

export default MessageModal
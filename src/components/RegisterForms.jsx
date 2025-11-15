import React, { useState } from 'react'
import axios from 'axios'
import { API_URL } from '../config/apiConfig'

import { HiOutlineArrowUturnLeft } from "react-icons/hi2"
import { MdOutlinePhotoLibrary } from "react-icons/md"
import { Navigate, useNavigate } from 'react-router-dom'

const RegisterForms = () => {
   const navigate = useNavigate()
   const [form, setForm] = useState('1')
   const [loading, setLoading] = useState(false)
   const [error, setError] = useState('')

   const [type, setType] = useState('')
   const [name, setName] = useState('')
   const [email, setEmail] = useState('')
   const [profilePicture, setProfilePicture] = useState(null)
   const [preview, setPreview] = useState(null)

   const [uPhoneNumber, setUPhoneNumber] = useState('')
   const [uLocation, setULocation] = useState('')
   const [uPassword, setUPassword] = useState('')
   const [uConfirmPassword, setUConfirmPassword] = useState('')

   const [cCnpj, setCCNPJ] = useState('')
   const [cLocation, setCLocation] = useState('')
   const [cArea, setCArea] = useState('')
   const [cPassword, setCPassword] = useState('')
   const [cConfirmPassword, setCConfirmPassword] = useState('')

   const containerStyle = 'w-full flex items-center rounded-lg border-2 border-secondary'
   const inputStyle = 'peer text-text text-lg w-full px-2.5 py-2 rounded-xl z-1 focus:outline-none'
   const labelStyle = 'absolute bg-bg text-lg text-text-secondary ml-2 px-2 rounded-lg z-0 transition-all duration-200 ease-out peer-focus:-translate-y-4 peer-focus:text-lg peer-focus:text-text peer-not-placeholder-shown:-translate-y-4 peer-not-placeholder-shown:text-md peer-not-placeholder-shown:pb-4'
   const nextButtonStyle = 'bg-secondary text-text text-3xl font-extrabold py-2 rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 hover:bg-linear-to-r hover:from-secundary/60 hover:to-primary/30'

   const handleRegister = async (e) => {
      setLoading(true)
      setError('')

      const body = {
         type,
         name,
         email,
         password: type === 'user' ? uPassword : cPassword,
         confirmPassword: type === 'user' ? uConfirmPassword : cConfirmPassword,
         location: type == 'user' ? uLocation : cLocation
      }

      try {
         const formData = new FormData()
         for (const key in body) {
            formData.append(key, body[key])
         }
         if (type === 'user') {
            formData.append('phoneNumber', uPhoneNumber)
         } 
         else if (type === 'company') {
            formData.append('cnpj', cCnpj)
            formData.append('area', cArea)
         }


         if (profilePicture && profilePicture !== "default") {
            formData.append("photo", profilePicture)
         }

         const response = await axios.post(`${API_URL}/register`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
         setError(response.data.message)
         setForm('completed')
      }
      catch (error) {
         console.error(error)
         if (error.response?.data?.message) {
            setError(error.response.data.message)
         }
         else {
            setError(`Erro ao conectar com o servidor`)
         }
      }
      finally {
         setLoading(false)
      }
   }
   const StepIndicator = ({ current, total = 4 }) => {
      return (
         <div className="flex items-center justify-center gap-3 mt-6">
            {Array.from({ length: total }).map((_, i) => {
               if (current == 'final') current = total
               const step = i + 1
               const isActive = Number(current) === step

               return (
                  <div
                     key={i}
                     className={`
                     w-4 h-4 rounded-full transition-all duration-300
                     ${isActive
                           ? 'bg-secondary scale-125 shadow-[0_0_10px_rgba(var(--secondary),.6)]'
                           : 'bg-text-secondary/40'
                        }
                  `}
                  />
               )
            })}
         </div>
      )
   }
   async function cropToSquare(file) {
      return new Promise((resolve) => {
         const img = new Image()
         img.onload = () => {
            const size = Math.min(img.width, img.height)
            const canvas = document.createElement("canvas")
            canvas.width = size
            canvas.height = size

            const ctx = canvas.getContext("2d")
            ctx.drawImage(
               img,
               (img.width - size) / 2,
               (img.height - size) / 2,
               size,
               size,
               0,
               0,
               size,
               size
            )

            canvas.toBlob((blob) => resolve(blob), "image/jpeg")
         }
         img.src = URL.createObjectURL(file)
      })
   }

   if (loading) {
      return (
         <div className='mt-30'>
            <div className='flex justify-center items-center'>
               <div className='bg-secondary h-17 w-17 rounded-full shadow-2xl shadow-secondary animate-bounce'></div>
            </div>
            <p className='text-text text-3xl font-bold mt-7'>Carregando...</p>
         </div>
      )
   }
   if (form == '1') {
      return initialForm()
   }
   else if (form == 'final') {
      return finalForm()
   }
   else if (form == 'completed') {
      return completedForm()
   }
   else if (type == 'user') {
      switch (form) {
         case '2':
            return formUser2()
         case '3':
            return formUser3()
      }
   }
   else if (type == 'company') {
      switch (form) {
         case '2':
            return formCompany2()
         case '3':
            return formCompany3()
         case '4':
            return formCompany4()
      }

      return (
         <div>RegisterForms</div>
      )
   }

   function initialForm() {
      const isStepValid = name.trim() !== '' && email.trim() !== '' && type.trim() !== ''

      return (
         <div className='w-full flex items-center'>
            <div className='w-full space-y-5'>
               <p className='text-center text-text text-4xl font-extrabold'>Registro</p>
               <div className={`${containerStyle} mt-6`}>
                  <input type="text" placeholder=' ' value={name}
                     onChange={e => setName(e.target.value)}
                     className={inputStyle} />
                  <label className={labelStyle}>
                     Nome Completo
                  </label>
               </div>
               <div className={`${containerStyle}`}>
                  <input type="email" placeholder=' ' value={email}
                     onChange={e => setEmail(e.target.value)}
                     className={inputStyle} />
                  <label className={labelStyle}>
                     Email
                  </label>
               </div>
               <div className='w-full flex justify-around gap-10'>
                  <button
                     onClick={() => setType('user')}
                     className={`text-text text-lg font-extrabold flex items-center px-5 py-1 mt-6 rounded-full border-2 border-secondary cursor-pointer
                                 transition duration-300 hover:scale-105
                                 ${type == 'user' ? 'shadow-[0_0_30px_rgba(var(--secondary),.2)] scale-108' : ''}`}>
                     Sou um profissional
                  </button>
                  <button
                     onClick={() => setType('company')}
                     className={`text-text text-lg font-extrabold flex items-center px-5 py-1 mt-6 rounded-full border-2 border-secondary cursor-pointer
                                 transition duration-300 hover:scale-105
                                 ${type == 'company' ? 'shadow-[0_0_30px_rgba(var(--secondary),.2)] scale-108' : ''}`}>
                     Sou uma empresa
                  </button>
               </div>
               <button
                  onClick={() => { if (isStepValid) setForm('2') }}
                  disabled={!isStepValid}
                  className={`w-full mt-3 ${nextButtonStyle} ${isStepValid
                     ? 'bg-secondary hover:bg-opacity-90 text-text cursor-pointer'
                     : 'bg-secondary/50 text-text-secondary cursor-not-allowed'
                     }`}>
                  Avançar
               </button>
               {error && (
                  <div className="w-full bg-red-500/20 border border-red-500 text-red-400
                     text-center py-3 px-4 rounded-lg animate-fadeIn">
                     {error}
                  </div>
               )}
            </div>
         </div>
      )
   }
   function finalForm() {
      const handleImageUpload = async (e) => {
         const file = e.target.files[0]
         if (!file) return

         const cropped = await cropToSquare(file)

         setProfilePicture(cropped)
         setPreview(URL.createObjectURL(cropped))
      }

      const handleUseDefault = () => {
         setProfilePicture("default")
         setPreview(null)
      }

      return (
         <div className="w-full flex flex-col items-center gap-5 mt-3">
            <div className="relative bg-bg-elevated w-80 h-80 rounded-full overflow-hidden border-2 border-secondary flex items-center justify-center">
               {preview ? (
                  <div>
                     <img src={preview} alt="preview" className="w-full h-full object-cover" />
                     <button
                        onClick={handleUseDefault}
                        className="absolute top-2 right-2 bg-bg/70 backdrop-blur-sm 
                          text-text border border-secondary rounded-full 
                          w-8 h-8 flex items-center justify-center 
                          text-lg font-bold cursor-pointer transition hover:scale-110 hover:bg-bg/90">
                        X
                     </button>
                  </div>

               ) : (
                  <span className="text-text-secondary text-sm text-center p-2">
                     Insira uma foto de perfil <br />(caso não insira uma padrão será colocada)
                  </span>
               )}
            </div>

            <div className='flex justify-center gap-5'>
               <button
                  onClick={() => setForm('3')}
                  className='w-23 text-text font-extrabold bg-primary hover:bg-primary/75 py-3 rounded-lg cursor-pointer transition duration-300'>
                  <HiOutlineArrowUturnLeft className='w-full text-2xl text-text text-center font-extrabold' />
               </button>
               <label className="w-25 h-15 flex items-center justify-center rounded-md border-2 border-secondary cursor-pointer transform-all duration-300 hover:scale-102">
                  <MdOutlinePhotoLibrary className='text-text text-3xl' />
                  <input
                     type="file"
                     accept="image/*"
                     className="hidden"
                     onChange={handleImageUpload} />
               </label>

               <button
                  onClick={handleRegister}
                  className="w-full bg-secondary text-text font-extrabold py-3 rounded-lg cursor-pointer transition duration-300 hover:bg-primary text-xl">
                  Finalizar Cadastro
               </button>
            </div>
            <StepIndicator current={form} />
            {error && (
               <div className="bg-red-500/20 border border-red-500 text-red-400
                     text-center py-3 px-4 rounded-lg animate-fadeIn">
                  {error}
               </div>
            )}
         </div>
      )

   }
   function completedForm() {
      return (
         <div className="w-full flex flex-col items-center gap-5 mt-3">
            <div className="w-28 h-28 rounded-full bg-secondary/20 flex items-center justify-center mt-3 animate-scaleIn">
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="rgb(var(--secondary))"
                  className="w-14 h-14">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
               </svg>
            </div>

            <h2 className="text-3xl font-extrabold text-text mb-2">
               Conta criada com sucesso!
            </h2>
            <p className="text-text-secondary text-lg max-w-sm">
               Agora você já pode acessar sua conta e começar a explorar todas as funcionalidades da Bridgely.
            </p>

            <button
               onClick={() => navigate('/')}
               className="mt-8 bg-secondary text-text font-bold text-xl px-8 py-3 rounded-lg transition duration-300 hover:bg-primary hover:scale-105">
               Continuar
            </button>

            {error && (
               <div className="w-full bg-red-500/20 border border-red-500 text-red-400
                     text-center py-3 px-4 rounded-lg animate-fadeIn">
                  {error}
               </div>
            )}
         </div>
      )
   }

   function formUser2() {
      const isStepValid = uPhoneNumber.trim() !== '' && uLocation.trim() !== ''

      return (
         <div className='w-full flex flex-col items-center space-y-5'>
            <div className={`${containerStyle} mt-6`}>
               <input type="tel" placeholder=' ' value={uPhoneNumber}
                  onChange={e => setUPhoneNumber(e.target.value)}
                  className={inputStyle} />
               <label className={labelStyle}>
                  Número de Celular
               </label>
            </div>

            <div className={`${containerStyle}`}>
               <input type="text" placeholder=' ' value={uLocation}
                  onChange={e => setULocation(e.target.value)}
                  className={inputStyle} />
               <label className={labelStyle}>
                  Localização (Cidade, Estado)
               </label>
            </div>

            <div className='w-full flex justify-between gap-4 pt-4 mt-3'>
               <button
                  onClick={() => setForm('1')}
                  className='w-1/6 text-text font-extrabold bg-primary hover:bg-primary/75 py-3 rounded-lg cursor-pointer transition duration-300'>
                  <HiOutlineArrowUturnLeft className='w-full text-2xl text-text text-center font-extrabold' />
               </button>
               <button
                  onClick={() => { if (isStepValid) setForm('3') }}
                  disabled={!isStepValid}
                  className={`w-5/6 ${nextButtonStyle} ${isStepValid
                     ? 'bg-secondary hover:bg-opacity-90 text-text cursor-pointer'
                     : 'bg-secondary/50 text-text-secondary cursor-not-allowed'
                     }`}>
                  Avançar
               </button>
            </div>

            <StepIndicator current={form} />
            {error && (
               <div className="w-full bg-red-500/20 border border-red-500 text-red-400
                     text-center py-3 px-4 rounded-lg animate-fadeIn">
                  {error}
               </div>
            )}
         </div>
      )
   }
   function formUser3() {
      const isStepValid = uPassword.trim() !== '' && uConfirmPassword.trim() !== ''

      return (
         <div className='w-full flex flex-col items-center space-y-5'>
            <div className={`${containerStyle} mt-6`}>
               <input type="password" placeholder=' ' value={uPassword}
                  onChange={e => setUPassword(e.target.value)}
                  className={inputStyle} />
               <label className={labelStyle}>
                  Senha
               </label>
            </div>

            <div className={`${containerStyle}`}>
               <input type="password" placeholder=' ' value={uConfirmPassword}
                  onChange={e => setUConfirmPassword(e.target.value)}
                  className={inputStyle} />
               <label className={labelStyle}>
                  Confirmar senha
               </label>
            </div>

            <div className='w-full flex justify-between gap-4 pt-4 mt-3'>
               <button
                  onClick={() => setForm('2')}
                  className='w-1/6 text-text font-extrabold bg-primary hover:bg-primary/75 py-3 rounded-lg cursor-pointer transition duration-300'>
                  <HiOutlineArrowUturnLeft className='w-full text-2xl text-text text-center font-extrabold' />
               </button>
               <button
                  onClick={() => { if (isStepValid) setForm('final') }}
                  disabled={!isStepValid}
                  className={`w-5/6 ${nextButtonStyle} ${isStepValid
                     ? 'bg-secondary hover:bg-opacity-90 text-text cursor-pointer'
                     : 'bg-secondary/50 text-text-secondary cursor-not-allowed'
                     }`}>
                  Avançar
               </button>
            </div>

            <StepIndicator current={form} />
            {error && (
               <div className="w-full bg-red-500/20 border border-red-500 text-red-400
                     text-center py-3 px-4 rounded-lg animate-fadeIn">
                  {error}
               </div>
            )}
         </div>
      )
   }

   function formCompany2() {
      const isStepValid = cCnpj.trim() !== '' && cLocation.trim() !== '' && cArea.trim() !== ''

      return (
         <div className='w-full flex flex-col items-center space-y-5'>
            <div className={`${containerStyle} mt-6`}>
               <input type="tel" placeholder=' ' value={cCnpj}
                  onChange={e => setCCNPJ(e.target.value)}
                  className={inputStyle} />
               <label className={labelStyle}>
                  Número de Celular
               </label>
            </div>

            <div className={`${containerStyle}`}>
               <input type="text" placeholder=' ' value={cLocation}
                  onChange={e => setCLocation(e.target.value)}
                  className={inputStyle} />
               <label className={labelStyle}>
                  Localização (Cidade, Estado)
               </label>
            </div>

            <div className={`${containerStyle}`}>
               <input type="text" placeholder=' ' value={cArea}
                  onChange={e => setCArea(e.target.value)}
                  className={inputStyle} />
               <label className={labelStyle}>
                  Área da sua empresa
               </label>
            </div>

            <div className='w-full flex justify-between gap-4 pt-4 mt-3'>
               <button
                  onClick={() => setForm('1')}
                  className='w-1/6 text-text font-extrabold bg-primary hover:bg-primary/75 py-3 rounded-lg cursor-pointer transition duration-300'>
                  <HiOutlineArrowUturnLeft className='w-full text-2xl text-text text-center font-extrabold' />
               </button>
               <button
                  onClick={() => { if (isStepValid) setForm('3') }}
                  disabled={!isStepValid}
                  className={`w-5/6 ${nextButtonStyle} ${isStepValid
                     ? 'bg-secondary hover:bg-opacity-90 text-text cursor-pointer'
                     : 'bg-secondary/50 text-text-secondary cursor-not-allowed'
                     }`}>
                  Avançar
               </button>
            </div>
            <StepIndicator current={form} />
            {error && (
               <div className="w-full bg-red-500/20 border border-red-500 text-red-400
                     text-center py-3 px-4 rounded-lg animate-fadeIn">
                  {error}
               </div>
            )}
         </div>
      )
   }
   function formCompany3() {
      const isStepValid = uPassword.trim() !== '' && uConfirmPassword.trim() !== ''

      return (
         <div className='w-full flex flex-col items-center space-y-5'>
            <div className={`${containerStyle} mt-6`}>
               <input type="password" placeholder=' ' value={cPassword}
                  onChange={e => setCPassword(e.target.value)}
                  className={inputStyle} />
               <label className={labelStyle}>
                  Senha
               </label>
            </div>

            <div className={`${containerStyle}`}>
               <input type="password" placeholder=' ' value={cConfirmPassword}
                  onChange={e => setCConfirmPassword(e.target.value)}
                  className={inputStyle} />
               <label className={labelStyle}>
                  Confirmar senha
               </label>
            </div>

            <div className='w-full flex justify-between gap-4 pt-4 mt-3'>
               <button
                  onClick={() => setForm('2')}
                  className='w-1/6 text-text font-extrabold bg-primary hover:bg-primary/75 py-3 rounded-lg cursor-pointer transition duration-300'>
                  <HiOutlineArrowUturnLeft className='w-full text-2xl text-text text-center font-extrabold' />
               </button>
               <button
                  onClick={() => { if (isStepValid) setForm('final') }}
                  disabled={!isStepValid}
                  className={`w-5/6 ${nextButtonStyle} ${isStepValid
                     ? 'bg-secondary hover:bg-opacity-90 text-text cursor-pointer'
                     : 'bg-secondary/50 text-text-secondary cursor-not-allowed'
                     }`}>
                  Avançar
               </button>
            </div>
            <StepIndicator current={form} />
            {error && (
               <div className="w-full bg-red-500/20 border border-red-500 text-red-400
                     text-center py-3 px-4 rounded-lg animate-fadeIn">
                  {error}
               </div>
            )}
         </div>
      )
   }
}

export default RegisterForms
import React, { useState } from 'react'

import BridgelyLogo from '../assets/images/bridgelyLogo.png'
import Navbar from '../components/Navbar'
import RegisterForms from '../components/RegisterForms'

const Register = () => {
  return (
    <div className='bg-bg w-screen min-h-screen flex justify-center'>
      <Navbar/>
      <main className='w-130 flex items-center flex-col pt-25 mx-3'>
         <img src={BridgelyLogo} alt="logo" className='w-35 drop-shadow-[0_0_40px_rgba(var(--secondary),0.2)]' />
         <RegisterForms/>
      </main>
    </div>
  )
}

export default Register
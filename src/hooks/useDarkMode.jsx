import { useState, useEffect } from 'react'

const useDarkMode = () => {
   const STORAGE_KEY = 'theme'
   
   const getInitialTheme = () => {
      const savedTheme = localStorage.getItem(STORAGE_KEY)
      if (savedTheme) {
         return savedTheme == 'dark'
      }
      
      if (window.matchMedia) {
         return window.matchMedia('(prefers-color-scheme: dark)').matches
      }
      return true
   }
   
   const [isDarkMode, setIsDarkMode] = useState(getInitialTheme)

   const enableDarkMode = () => {
      setIsDarkMode(true)
      localStorage.setItem(STORAGE_KEY, 'dark')
   }
   const disableDarkMode = () => {
      setIsDarkMode(false)
      localStorage.setItem(STORAGE_KEY, 'light')
   }
   const toggleDarkMode = () => {
      if (isDarkMode) {
         disableDarkMode()
      } else {
         enableDarkMode()
      }
   }

   useEffect(() => {
      const html = document.documentElement

      if (isDarkMode) {
         html.classList.add('dark')
         html.classList.remove('light')
      }
      else {
         html.classList.add('light')
         html.classList.remove('dark')
      }
   }, [isDarkMode])

   return {
      isDarkMode,
      toggleDarkMode,
      enableDarkMode,
      disableDarkMode   
   }
}

export default useDarkMode
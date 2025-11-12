import React, { createContext, useContext } from 'react'
import useDarkMode from '../hooks/useDarkMode'

const themeContext = createContext()

export const useTheme = () => useContext(themeContext)

export const ThemeProvider = ({children}) => {
   const theme = useDarkMode()
   return (
      <themeContext.Provider value={theme}>
         {children}
      </themeContext.Provider>
   )
}

export default themeContext
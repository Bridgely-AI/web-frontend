import React, { createContext, useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { API_URL } from '../config/apiConfig'

export const AuthContext = createContext()

const decodeJwt = (token) => {
   if (!token) return null
   try {
      const payloadBase64 = token.split('.')[1]
      const payload = JSON.parse(atob(payloadBase64))
      return payload
   } catch (e) {
      console.error("Erro ao decodificar token:", e)
      return null
   }
}

export const AuthProvider = ({ children }) => {
   const [user, setUser] = useState(null)
   const [loading, setLoading] = useState(true)
   const [isAuthenticated, setIsAuthenticated] = useState(false)

   const fetchUserProfile = useCallback(async (token) => {
      try {
         const response = await axios.get(`${API_URL}/profile`, {
            headers: {
               Authorization: `Bearer ${token}`
            }
         })
         setUser(response.data.user)
         setIsAuthenticated(true)
      } catch (error) {
         console.error('Erro ao buscar perfil:', error.response?.data?.message || error.message)
         localStorage.removeItem('token')
         setUser(null)
         setIsAuthenticated(false)
      } finally {
         setLoading(false)
      }
   }, [])

   const login = (token) => {
      localStorage.setItem('token', token)
      fetchUserProfile(token)
   }

   const logout = () => {
      localStorage.removeItem('token')
      setUser(null)
      setIsAuthenticated(false)
   }

   useEffect(() => {
      const token = localStorage.getItem('token')
      if (token) {
         const decoded = decodeJwt(token)
         const isExpired = decoded && decoded.exp * 1000 < Date.now()

         if (isExpired) {
            logout()
         } else {
            fetchUserProfile(token)
         }
      } else {
         setLoading(false) 
      }
   }, [fetchUserProfile])

   const contextValue = {
      user,
      isAuthenticated,
      loading,
      login,
      logout,
      fetchUserProfile
   }

   return (
      <AuthContext.Provider value={contextValue}>
         {children}
      </AuthContext.Provider>
   )
}
import axios from 'axios'
import { API_URL } from '../config/apiConfig'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

import Navbar from '../components/Navbar'
import StudyForm from '../components/StudyForm'
import PlanDisplay from '../components/PlanDisplay'
import { MdOutlineScience } from 'react-icons/md'
import { HiOutlineArrowUturnLeft } from "react-icons/hi2"

const Study = () => {
  const { user, isAuthenticated, loading: authLoading } = useAuth()
  const navigate = useNavigate()

  const [studyPlan, setStudyPlan] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!authLoading && isAuthenticated && user?.type == 'company') {
      navigate('/')
    }
  }, [user, isAuthenticated])

  const handleGeneratePlan = async ({ targetArea, budgetLimit }) => {
    if (!isAuthenticated || authLoading) {
      setError('Você precisa estar logado para gerar um plano de estudos.')
      navigate('/login')
      return
    }

    setLoading(true)
    setError(null)
    setStudyPlan(null)

    try {
      const payload = {
        targetArea: targetArea,
        budgetLimit: budgetLimit,
        profileData: {
          hardSkills: user?.hardSkills || [],
          softSkills: user?.softSkills || [],
          hobbies: user?.hobbies || []
        }
      }

      const token = localStorage.getItem('token')
      const response = await axios.post(`${API_URL}/api/studyplan`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      setStudyPlan(response.data)
    }
    catch (error) {
      console.error('Erro na geração do plano: ', error.response || error)
      setError(error.response?.data?.message || 'Falha ao conectar com a IA ou limite excedido.')
    }
    finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setStudyPlan(null)
    setError(null)
  }

  if (user?.type == 'company') return null

  return (
    <div>
      <div className='bg-bg w-full min-h-screen flex justify-center'>
        <Navbar currentPage={'study'} />
        <main className="pt-25">
          <h1 className="text-4xl font-extrabold text-secondary mb-8 flex items-center gap-3 justify-center">
            Gerador de Plano de Estudos por IA
          </h1>

          {!studyPlan ? (
            <>
              <StudyForm
                onSubmit={handleGeneratePlan}
                isGenerating={loading}
                defaultBudget={500}
              />
              <div className='w-fit mx-auto mt-10'>
                {error && (
                  <div className="bg-warning/20 text-center text-warning px-4 py-2 mx-auto border border-warning rounded-lg">
                    {error}
                  </div>
                )}
                {loading && (
                  <p className="text-xl text-primary text-center mt-8">
                    A IA está montando seu plano... (Pode levar até 30 segundos)
                  </p>
                )}
              </div>
            </>
          ) : (
            <>
              <button
                onClick={handleReset}
                className="flex items-center gap-2 text-text-secondary font-bold mb-4 px-4 py-2 border-2 border-secondary rounded-2xl 
                          cursor-pointer transition-all hover:text-secondary hover:scale-105">
                <HiOutlineArrowUturnLeft className="text-xl" />
                Gerar Novo Plano
              </button>
              <PlanDisplay plan={studyPlan} />
            </>
          )}
        </main>
      </div>
    </div>
  )
}

export default Study
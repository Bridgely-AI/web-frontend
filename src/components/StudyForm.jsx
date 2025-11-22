import React, { useState } from 'react'
import { FaPlay } from 'react-icons/fa'

const StudyForm = ({ onSubmit, isGenerating, defaultBudget = 500 }) => {
    const [targetArea, setTargetArea] = useState('')
    const [budgetLimit, setBudgetLimit] = useState(defaultBudget)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (targetArea.trim() === '' || budgetLimit <= 0) {
            alert("Preencha a área de foco e defina um orçamento válido.")
            return
        }
        onSubmit({ targetArea, budgetLimit })
    }

    return (
        <form onSubmit={handleSubmit} className="bg-bg-elevated max-w-2xl space-y-6 p-4 py-8 md:p-8 mx-auto rounded-xl shadow-xl">
            <p className="text-2xl text-center md:text-left font-semibold text-text">Defina Seu Objetivo</p>            
            <div>
                <label className="block text-text-secondary mb-2">Qual área ou tecnologia você quer aprender?</label>
                <input
                    type="text"
                    value={targetArea}
                    onChange={(e) => setTargetArea(e.target.value)}
                    placeholder="Ex: Engenharia de Dados, TypeScript, Cibersegurança"
                    className="w-full p-3 bg-bg border border-secondary rounded-lg text-text focus:border-primary outline-none"
                    required/>
            </div>            
            <div>
                <label className="block text-text-secondary mb-2">Limite de Orçamento (R$)</label>
                <input
                    type="number"
                    value={budgetLimit}
                    onChange={(e) => setBudgetLimit(Number(e.target.value))}
                    min="0"
                    placeholder="500"
                    className="w-full p-3 bg-bg border border-secondary rounded-lg text-text focus:border-primary outline-none"
                    required/>
                <p className="text-sm text-text-secondary/70 mt-1">O plano tentará não exceder este valor em recursos pagos.</p>
            </div>
            <button
                type="submit"
                disabled={isGenerating}
                className={`w-full flex items-center justify-center gap-3 p-3 text-xl font-bold rounded-lg transition duration-300 ${
                    isGenerating 
                        ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                        : 'bg-secondary hover:bg-secondary/90 text-white'}`}>
                {isGenerating ? 'Gerando Plano...' : 'Gerar Plano Personalizado'}
                <FaPlay className={isGenerating ? 'animate-spin' : ''} />
            </button>
        </form>
    )
}

export default StudyForm
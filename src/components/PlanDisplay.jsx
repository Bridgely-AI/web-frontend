import React from 'react'
import { FaCheckCircle, FaBook, FaLaptopCode, FaDollarSign, FaClock, FaExclamationTriangle } from 'react-icons/fa'

const PlanDisplay = ({ plan }) => {
  if (false) {
    plan = {
      "studyPlanTitle": "Plano Acelerado: Engenharia de Dados com foco em Nuvem",
      "durationWeeks": 10,
      "estimatedCost": 10000.00,
      "budgetExceeded": false,
      "targetArea": "Engenharia de Dados",
      "introduction": "Com base nas suas habilidades em Python, focaremos em modelagem de dados e pipelines em ambiente de nuvem (AWS/Azure) para complementar seu perfil, mantendo o orçamento sob controle. Suas Soft Skills de comunicação serão úteis na documentação do projeto final.",
      "modules": [
        {
          "moduleName": "Módulo 1: Fundamentos e SQL Avançado",
          "durationWeeks": 2,
          "costEstimate": 80.00,
          "focusSkills": ["SQL", "Modelagem Dimensional"],
          "activities": [
            {
              "type": "Curso Online",
              "name": "SQL para Data Science",
              "resource": "Plataforma X (Ex: Udemy)",
              "cost": 80.00,
              "why": "Fortalecer a base de consultas complexas e otimização de queries.",
              "priority": "Alta"
            },
            {
              "type": "Projeto Prático",
              "name": "Normalização de um Dataset",
              "resource": "Kaggle",
              "cost": 0.00,
              "why": "Aplicação imediata dos conceitos de modelagem.",
              "priority": "Alta"
            }
          ]
        },
        {
          "moduleName": "Módulo 2: Pipelines e Cloud (Introdução ao ETL)",
          "durationWeeks": 4,
          "costEstimate": 250.00,
          "focusSkills": ["Python", "Pandas", "AWS S3", "ETL"],
          "activities": [
            {
              "type": "Curso Online",
              "name": "Introdução ao AWS Data Services",
              "resource": "Plataforma Y (Ex: Alura)",
              "cost": 250.00,
              "why": "Aprender a manipular dados em ambiente escalável de nuvem.",
              "priority": "Alta"
            },
            {
              "type": "Projeto Prático",
              "name": "Criar Pipeline ETL Simples com Python",
              "resource": "Github",
              "cost": 0.00,
              "why": "Construir seu primeiro fluxo de extração, transformação e carga.",
              "priority": "Média"
            }
          ]
        },
        {
          "moduleName": "Módulo 3: Ferramentas de Orquestração",
          "durationWeeks": 4,
          "costEstimate": 120.00,
          "focusSkills": ["Apache Airflow", "Versionamento", "Documentação"],
          "activities": [
            {
              "type": "Livro",
              "name": "Data Orchestration Best Practices",
              "resource": "Ebook Técnico",
              "cost": 120.00,
              "why": "Entender como gerenciar e monitorar pipelines complexos.",
              "priority": "Alta"
            },
            {
              "type": "Projeto Prático",
              "name": "Publicar um Dicionário de Dados",
              "resource": "Github Pages",
              "cost": 0.00,
              "why": "Usar o hobby de leitura para estruturar a documentação do projeto final.",
              "priority": "Média"
            }
          ]
        }
      ],
      "nextSteps": "Após concluir os módulos, utilize suas Soft Skills para apresentar o projeto final em uma comunidade técnica ou crie um repositório robusto no GitHub para começar a buscar oportunidades."
    }
  }

  if (!plan) return null

  return (
    <div className="bg-bg-elevated w-full md:max-w-6xl px-2 md:px-10 py-10 mt-10 rounded-xl shadow-2xl border border-primary/20">
      <div className="p-2 md:p-10 border-b border-text-secondary/10">
        <h2 className="text-2xl md:text-4xl text-secondary font-extrabold mb-4 leading-tight">
          {plan.studyPlanTitle}
        </h2>
        <p className="text-text-secondary text-sm md:text-base leading-relaxed">
          {plan.introduction}
        </p>
      </div>

      <div className="bg-bg/50 flex flex-col py-4 mb-8 rounded-lg">
        <div className='flex items-center justify-evenly'>
          <div className="text-center">
            <FaClock className="text-information mx-auto mb-1" />
            <p className="text-sm text-text-secondary">Duração</p>
            <p className="font-bold text-text">{plan.durationWeeks} Semanas</p>
          </div>
          <div className="text-center">
            <FaDollarSign className="text-information mx-auto mb-1" />
            <p className="text-sm text-text-secondary">Custo Estimado</p>
            <p className="font-bold text-text">R${plan.estimatedCost.toFixed(2)}</p>
          </div>
        </div>
        {plan.budgetExceeded && (
          <div className="bg-warning/20 text-sm text-center text-warning flex items-center justify-center gap-2 
                          p-2 mt-4 mx-auto rounded-lg">
            <FaExclamationTriangle />
            <p className="font-bold">Aviso: Orçamento Excedido!</p>
          </div>
        )}
      </div>

      <div className='py-5 rounded-sm'>
        {plan.modules.map((module, moduleIndex) => (
          <div 
          key={moduleIndex} 
          className="bg-primary/10 flex flex-col md:flex-row mb-10 p-3 py-6 md:p-6 border-l-4 border-primary rounded-lg shadow-md">
            <div className="mb-6">
              <h3 className="text-xl md:text-2xl font-bold text-text mb-2">{module.moduleName}</h3>
              <p className="text-sm text-text-secondary">
                <span className="text-secondary font-bold">Foco:</span> {module.focusSkills.join(', ')}
              </p>
            </div>

            <div className="space-y-4">
              {module.activities.map((activity, activityIndex) => (
                <div key={activityIndex} className="flex items-start gap-3 p-3 bg-bg rounded-lg">
                  <FaCheckCircle className="text-success mt-1 shrink-0" />
                  <div>
                    <p className="font-semibold text-text">{activity.name} ({activity.type})</p>
                    <p className="text-sm text-text-secondary">
                      Recurso: {activity.resource} | Custo: R${activity.cost.toFixed(2)} | Prioridade: {activity.priority}
                    </p>
                    <p className="text-xs text-information/80 italic mt-1">Por quê: {activity.why}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 border-t-2 border-primary/50">
        <h3 className="text-xl font-bold text-text">Próximos Passos</h3>
        <p className="text-text-secondary mt-2">{plan.nextSteps}</p>
      </div>
    </div>
  )
}

export default PlanDisplay
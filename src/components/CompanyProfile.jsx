import React from 'react'
import { FaPlus } from "react-icons/fa6"

const CompanyProfile = ({
   isEditing,
   edits,
   profileData,
   handleComplexItemChange,
   addComplexItem,
   removeComplexItem,
   formatDate,
   handleInputChange
}) => {

   const data = isEditing ? edits : profileData

   return (
      <div className='h-full flex space-x-1 mt-5 text-text'>
         <div className='w-3/10 mr-5 border-r border-text-secondary/50 pr-4'>
            <div className='space-y-6'>
               <div>
                  <p className='text-xl font-medium text-secondary mb-2'>Localização</p>
                  {isEditing ? (
                     <input
                        name="location"
                        value={data.location}
                        onChange={handleInputChange}
                        className="w-full bg-bg border border-secondary/50 rounded p-2 text-text focus:outline-secondary"
                        placeholder="Cidade - UF"
                     />
                  ) : (
                     <p className='text-text-secondary'>{data.location || 'Não informada'}</p>
                  )}
               </div>
               <div>
                  <p className='text-xl font-medium text-secondary mb-2'>Email</p>
                  {isEditing ? (
                     <input
                        name="email"
                        value={data.email}
                        onChange={handleInputChange}
                        className="w-full bg-bg border border-secondary/50 rounded p-2 text-text focus:outline-secondary"
                        placeholder="email@empresa.com"
                     />
                  ) : (
                     <p className='text-text-secondary'>{data.email || 'Não informado.'}</p>
                  )}
               </div>

               <div>
                  <p className='text-xl font-medium text-secondary mb-2'>Website</p>
                  {isEditing ? (
                     <input
                        name="website"
                        value={data.website}
                        onChange={handleInputChange}
                        className="w-full bg-bg border border-secondary/50 rounded p-2 text-text focus:outline-secondary"
                        placeholder="https://www.site.com"
                     />
                  ) : (
                     data.website && (
                        <a href={data.website} target="_blank" rel="noopener noreferrer" className='text-information hover:underline break-words'>
                           {data.website || 'Não informado'}
                        </a>
                     )
                  )}
               </div>
            </div>
         </div>

         <div className='w-6/10 ml-5 text-text'>
            <h2 className='text-3xl font-extrabold text-text-primary mb-3'>Vagas Disponíveis</h2>
            <div className='space-y-6'>
               {isEditing ? (
                  <>
                     {data.jobs?.map((job, index) => (
                        <div key={index} className='p-6 bg-bg-elevated rounded-xl shadow-lg border border-secondary/30 relative'>
                           <button 
                           onClick={() => removeComplexItem(index, 'jobs')} 
                           className='absolute top-4 right-4 text-red-400 hover:text-red-600 font-bold'>
                              Remover
                           </button>
                           <div className="mb-3">
                              <label className="text-xs text-text-secondary">Título</label>
                              <input value={job.title} onChange={(e) => handleComplexItemChange(e, index, 'jobs', 'title')} className="w-full bg-bg border border-secondary/50 rounded p-2 text-text" />
                           </div>
                           <div className="mb-3">
                              <label className="text-xs text-text-secondary">Link</label>
                              <input value={job.link} onChange={(e) => handleComplexItemChange(e, index, 'jobs', 'link')} className="w-full bg-bg border border-secondary/50 rounded p-2 text-text" />
                           </div>
                           <div>
                              <label className="text-xs text-text-secondary">Descrição</label>
                              <textarea value={job.description} onChange={(e) => handleComplexItemChange(e, index, 'jobs', 'description')} className="w-full bg-bg border border-secondary/50 rounded p-2 text-text h-20" />
                           </div>
                        </div>
                     ))}
                     <button 
                        onClick={() => addComplexItem('jobs')} 
                        className='w-full py-3 border-2 border-dashed border-secondary/40 text-secondary font-bold rounded-xl hover:bg-secondary/10 flex justify-center items-center gap-2'>
                           <FaPlus /> Adicionar Vaga
                        </button>
                  </>
               ) : (
                  data.jobs && data.jobs.length > 0 ? data.jobs.map((job, index) => (
                     <div key={index} className='p-6 bg-bg-elevated rounded-xl shadow-lg border border-secondary/10'>
                        <div className='flex justify-between items-start'>
                           <h3 className='text-xl font-bold text-secondary'>{job.title}</h3>
                           {job.link && <a href={job.link} target="_blank" className='bg-secondary text-text px-4 py-1 rounded-full text-sm font-bold hover:scale-105 transition'>Aplicar</a>}
                        </div>
                        <p className='text-text-primary/90 mt-3'>{job.description}</p>
                     </div>
                  )) : <p className='text-text-secondary italic'>Nenhuma vaga aberta.</p>
               )}
            </div>

            <h2 className='text-3xl font-extrabold text-text-primary mt-10 mb-3'>Vagas Futuras (Previsão)</h2>
            <div className='space-y-6'>
               {isEditing ? (
                  <>
                     {data.futureJobs?.map((job, index) => (
                        <div key={index} className='p-6 bg-bg-elevated rounded-xl shadow-lg border border-primary/30 relative'>
                           <button onClick={() => removeComplexItem(index, 'futureJobs')} className='absolute top-4 right-4 text-red-400 hover:text-red-600 font-bold'>Remover</button>
                           <div className="grid grid-cols-2 gap-4 mb-3">
                              <div><label className="text-xs text-text-secondary">Título</label><input value={job.title} onChange={(e) => handleComplexItemChange(e, index, 'futureJobs', 'title')} className="w-full bg-bg border border-primary/50 rounded p-2 text-text" /></div>
                              <div><label className="text-xs text-text-secondary">Data Prevista</label><input value={job.expectedDate} onChange={(e) => handleComplexItemChange(e, index, 'futureJobs', 'expectedDate')} className="w-full bg-bg border border-primary/50 rounded p-2 text-text" /></div>
                           </div>
                           <textarea value={job.description} onChange={(e) => handleComplexItemChange(e, index, 'futureJobs', 'description')} className="w-full bg-bg border border-primary/50 rounded p-2 text-text h-20" />
                        </div>
                     ))}
                     <button onClick={() => addComplexItem('futureJobs')} className='w-full py-3 border-2 border-dashed border-primary/40 text-primary font-bold rounded-xl hover:bg-primary/10 flex justify-center items-center gap-2'><FaPlus /> Adicionar Vaga Futura</button>
                  </>
               ) : (
                  data.futureJobs && data.futureJobs.length > 0 ? data.futureJobs.map((job, index) => (
                     <div key={index} className='p-6 bg-bg-elevated/50 rounded-xl shadow border border-primary/20'>
                        <div className='flex justify-between'>
                           <h3 className='text-xl font-bold text-text-primary'>{job.title}</h3>
                           <span className='text-sm bg-primary/20 text-primary px-2 py-1 rounded'>{job.expectedDate}</span>
                        </div>
                        <p className='text-text-secondary mt-2'>{job.description}</p>
                     </div>
                  )) : <p className='text-text-secondary italic'>Nenhuma previsão.</p>
               )}
            </div>
         </div>
      </div>
   )
}

export default CompanyProfile
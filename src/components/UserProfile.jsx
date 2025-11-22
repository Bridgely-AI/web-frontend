import { FaPlus } from "react-icons/fa"

const UserProfile = ({
   isEditing,
   edits,
   profileData,
   handleItemChange,
   addItem,
   removeItem,
   handleComplexItemChange,
   addComplexItem,
   removeComplexItem,
   formatDate
}) => {
   const data = isEditing ? edits : profileData

   return (
      <div>
         <div className='h-full flex flex-col md:flex-row gap-8 md:gap-0 space-x-1 mt-5 text-text'>
            <div className='w-full md:w-3/10 mr-5 pb-8 md:pb-0 md:border-r md:border-text-secondary/50'>
               <p className='text-xl font-medium'>Habilidades Técnicas (hard skills)</p>
               <div className='flex flex-wrap gap-3 mt-4'>
                  {isEditing ? (
                     <>
                        <button
                           onClick={(e) => addItem('hardSkills')}
                           className='flex items-center gap-2 px-4 py-1 border border-secondary rounded-xl
                                             cursor-pointer transition-all hover:text-secondary hover:scale-102'>
                           <FaPlus /> Adicionar Hardskill
                        </button>
                        {data.hardSkills?.map((skill, index) => (
                           <div className='bg-secondary/10 flex items-center gap-2 font-medium px-3 py-1 rounded-full border border-secondary'>
                              <input
                                 type="text"
                                 value={skill}
                                 onChange={(e) => handleItemChange(e, index, 'hardSkills')}
                                 className='bg-primary/50 min-w-18 focus:outline-none focus:border-secondary'
                                 style={{ width: `${Math.max(skill.length, 1)}ch` }}
                                 placeholder='Hard skill' />
                              <button
                                 onClick={() => removeItem(index, 'hardSkills')}
                                 className='cursor-pointer transition-all hover:text-secondary hover:scale-115'>
                                 x
                              </button>
                           </div>
                        ))}
                     </>
                  ) : (
                     <>
                        {data.hardSkills && data.hardSkills.length > 0 ? (data.hardSkills.map((skill, index) => (
                           <span
                              key={index}
                              className='bg-secondary/10 text-secondary font-medium 
                                    px-3 py-1 rounded-full border border-secondary 
                                    transition duration-200 hover:bg-secondary/20'>
                              {skill}
                           </span>
                        ))) : (
                           <p className='text-text-secondary text-sm italic'>Nenhuma habilidade técnica listada.</p>
                        )}
                     </>
                  )}

               </div>

               <p className='text-xl font-medium mt-10'>Habilidades Comportamentais (soft skills)</p>
               <div className='text-text flex flex-wrap gap-3 mt-4'>
                  {isEditing ? (
                     <>
                        <button
                           onClick={(e) => addItem('softSkills')}
                           className='flex items-center gap-2 px-4 py-1 border border-primary rounded-xl
                                             cursor-pointer transition-all hover:text-primary hover:scale-102'>
                           <FaPlus /> Adicionar Softskill
                        </button>
                        {edits.softSkills?.map((skill, index) => (
                           <div className='bg-primary/10 flex items-center gap-2 font-medium px-3 py-1 rounded-full border border-primary'>
                              <input
                                 type="text"
                                 value={skill}
                                 onChange={(e) => handleItemChange(e, index, 'softSkills')}
                                 className='bg-primary/50 min-w-18 focus:outline-none focus:border-primary'
                                 style={{ width: `${Math.max(skill.length, 1)}ch` }}
                                 placeholder='Soft skill' />
                              <button
                                 onClick={() => removeItem(index, 'softSkills')}
                                 className='cursor-pointer transition-all hover:text-primary hover:scale-115'>
                                 x
                              </button>
                           </div>
                        ))}
                     </>
                  ) : (
                     <>
                        {data.softSkills && data.softSkills.length > 0 ? (data.softSkills.map((skill, index) => (
                           <span
                              key={index}
                              className='bg-primary/10 text-primary font-medium 
                                    px-3 py-1 rounded-full border border-primary 
                                    transition duration-200 hover:bg-primary/20'>
                              {skill}
                           </span>
                        ))) : (
                           <p className='text-text-secondary text-sm italic'>Nenhuma habilidade técnica listada.</p>
                        )}
                     </>
                  )}
               </div>

               <p className='text-xl font-medium mt-10'>Hobbies</p>
               <div className='flex flex-wrap gap-2 mt-4'>
                  {isEditing ? (
                     <>
                        <button
                           onClick={(e) => addItem('hobbies')}
                           className='flex items-center gap-2 px-4 py-1 border border-warning rounded-xl
                                             cursor-pointer transition-all hover:text-warning hover:scale-102'>
                           <FaPlus /> Adicionar Hobbie
                        </button>
                        {edits.hobbies?.map((skill, index) => (
                           <div className='bg-warning/10 flex items-center gap-2 font-medium px-3 py-1 rounded-full border border-warning'>
                              <input
                                 type="text"
                                 value={skill}
                                 onChange={(e) => handleItemChange(e, index, 'hobbies')}
                                 className='bg-primary/50 min-w-18 focus:outline-none focus:border-primary'
                                 style={{ width: `${Math.max(skill.length, 1)}ch` }}
                                 placeholder='Hobbie' />
                              <button
                                 onClick={() => removeItem(index, 'hobbies')}
                                 className='cursor-pointer transition-all hover:text-warning hover:scale-115'>
                                 x
                              </button>
                           </div>
                        ))}
                     </>
                  ) : (
                     <>
                        {data.hobbies && data.hobbies.length > 0 ? (data.hobbies.map((hobby, index) => (
                           <span
                              key={index}
                              className='bg-accent/10 font-medium 
                                    px-3 py-1 rounded-full border border-accent
                                    transition duration-200 hover:bg-accent/20'>
                              {hobby}
                           </span>
                        ))) : (
                           <p className='text-text-secondary text-sm italic'>Nenhum hobbie listado.</p>
                        )}
                     </>
                  )}
               </div>
            </div>

            <div className='w-full md:w-6/10 md:ml-5 text-text'>
               <h2 className='text-3xl font-extrabold text-text-primary mb-3'>Experiências Profissionais</h2>
               <div className='space-y-6'>
                  {isEditing ? (
                     <>
                        {edits.experiences?.map((exp, index) => (
                           <div key={index} className='p-2 md:p-6 bg-bg-elevated rounded-xl shadow-lg border border-secondary/30 relative group'>
                              <button
                                 onClick={() => removeComplexItem(index, 'experiences')}
                                 className='absolute top-4 right-4 text-warning/70 font-bold text-sm border border-warning/30 px-2 py-1 rounded
                                       transition-all hover:warning-500 hover:bg-warning/10 hover:scale-103 cursor-pointer'>
                                 Remover
                              </button>

                              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 mb-3'>
                                 <div>
                                    <label className='text-xs text-text-secondary ml-1'>Cargo</label>
                                    <input
                                       value={exp.role}
                                       onChange={(e) => handleComplexItemChange(e, index, 'experiences', 'role')}
                                       className='w-full bg-bg border border-secondary/50 rounded-lg p-2 text-text focus:outline-secondary'
                                       placeholder='Ex: Dev FullStack'
                                    />
                                 </div>
                                 <div>
                                    <label className='text-xs text-text-secondary ml-1'>Empresa</label>
                                    <input
                                       value={exp.company}
                                       onChange={(e) => handleComplexItemChange(e, index, 'experiences', 'company')}
                                       className='w-full bg-bg border border-secondary/50 rounded-lg p-2 text-text focus:outline-secondary'
                                       placeholder='Ex: Google'
                                    />
                                 </div>
                              </div>

                              <div className='grid grid-cols-2 gap-4 mb-3'>
                                 <div>
                                    <label className='text-xs text-text-secondary ml-1'>Início</label>
                                    <input
                                       type='date'
                                       value={exp.startDate ? String(exp.startDate).slice(0, 10) : ''}
                                       onChange={(e) => handleComplexItemChange(e, index, 'experiences', 'startDate')}
                                       className='w-full bg-bg border border-secondary/50 rounded-lg p-2 text-text-secondary'
                                    />
                                 </div>
                                 <div>
                                    <label className='text-xs text-text-secondary ml-1'>Fim</label>
                                    <input
                                       type='date'
                                       disabled={exp.isCurrent}
                                       value={exp.endDate ? String(exp.endDate).slice(0, 10) : ''}
                                       onChange={(e) => handleComplexItemChange(e, index, 'experiences', 'endDate')}
                                       className={`w-full bg-bg border border-secondary/50 rounded-lg p-2 text-text-secondary ${exp.isCurrent ? 'opacity-50' : ''}`}
                                    />
                                    <div className='flex items-center mt-2 gap-2'>
                                       <input
                                          type='checkbox'
                                          checked={exp.isCurrent || false}
                                          onChange={(e) => handleComplexItemChange(e, index, 'experiences', 'isCurrent')}
                                          className='accent-secondary h-4 w-4'
                                       />
                                       <span className='text-sm text-text-secondary'>Trabalho atual</span>
                                    </div>
                                 </div>
                              </div>

                              <div>
                                 <label className='text-xs text-text-secondary ml-1'>Descrição</label>
                                 <textarea
                                    value={exp.description}
                                    onChange={(e) => handleComplexItemChange(e, index, 'experiences', 'description')}
                                    className='w-full bg-bg border border-secondary/50 rounded-lg p-2 text-text h-24 focus:outline-secondary resize-none'
                                    placeholder='Descreva suas atividades...'
                                 />
                              </div>
                           </div>
                        ))}

                        <button
                           onClick={() => addComplexItem('experiences')}
                           className='w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-secondary/40 text-secondary font-bold rounded-xl 
                                 cursor-pointer hover:bg-secondary/10 hover:border-secondary transition-all'>
                           <FaPlus /> Adicionar Experiência
                        </button>
                     </>
                  ) : (
                     <>
                        {data.experiences && data.experiences.length > 0 ? (
                           data.experiences.map((exp, index) => (
                              <div key={index} className='p-6 bg-bg-elevated rounded-xl shadow-lg border border-secondary/10'>
                                 <h3 className='text-xl font-bold text-secondary'>{exp.role}</h3>
                                 <p className='text-lg font-medium'>{exp.company}</p>

                                 <p className='text-sm text-text-secondary mt-1'>
                                    {formatDate(exp.startDate)} — {exp.isCurrent ? 'Atual' : formatDate(exp.endDate)}
                                 </p>

                                 <p className='text-text-primary/90 mt-3'>{exp.description}</p>
                              </div>
                           ))
                        ) : (
                           <p className='text-text-secondary italic'>Nenhuma experiência profissional registrada.</p>
                        )}
                     </>
                  )}
               </div>

               <h2 className='text-3xl font-extrabold text-text-primary mt-10 mb-3'>Histórico Acadêmico</h2>
               <div className='space-y-6'>
                  {isEditing ? (
                     <>
                        {data.academicBackground?.map((edu, index) => (
                           <div key={index} className='p-6 bg-bg-elevated rounded-xl shadow-lg border border-primary/30 relative'>

                              <button
                                 onClick={() => removeComplexItem(index, 'academicBackground')}
                                 className='absolute top-4 right-4 text-warning/70 font-bold text-sm border border-warning/30 px-2 py-1 rounded
                                       transition-all hover:warning-500 hover:bg-warning/10 hover:scale-103 cursor-pointer'>
                                 Remover
                              </button>

                              <div className='grid grid-cols-2 gap-4 pt-4 mb-3'>
                                 <div>
                                    <label className='text-xs text-text-secondary ml-1'>Curso</label>
                                    <input
                                       value={edu.course}
                                       onChange={(e) => handleComplexItemChange(e, index, 'academicBackground', 'course')}
                                       className='w-full bg-bg border border-primary/50 rounded-lg p-2 text-text focus:outline-primary'
                                       placeholder='Ex: Ciência da Computação'
                                    />
                                 </div>
                                 <div>
                                    <label className='text-xs text-text-secondary ml-1'>Grau</label>
                                    <input
                                       value={edu.degree}
                                       onChange={(e) => handleComplexItemChange(e, index, 'academicBackground', 'degree')}
                                       className='w-full bg-bg border border-primary/50 rounded-lg p-2 text-text focus:outline-primary'
                                       placeholder='Ex: Bacharelado'
                                    />
                                 </div>
                              </div>

                              <div className='mb-3'>
                                 <label className='text-xs text-text-secondary ml-1'>Instituição</label>
                                 <input
                                    value={edu.institution}
                                    onChange={(e) => handleComplexItemChange(e, index, 'academicBackground', 'institution')}
                                    className='w-full bg-bg border border-primary/50 rounded-lg p-2 text-text focus:outline-primary'
                                    placeholder='Ex: USP'
                                 />
                              </div>

                              <div className='grid grid-cols-3 gap-4'>
                                 <div>
                                    <label className='text-xs text-text-secondary ml-1'>Início</label>
                                    <input
                                       type='date'
                                       value={edu.startDate ? String(edu.startDate).slice(0, 10) : ''}
                                       onChange={(e) => handleComplexItemChange(e, index, 'academicBackground', 'startDate')}
                                       className='w-full bg-bg border border-primary/50 rounded-lg p-2 text-text-secondary'
                                    />
                                 </div>
                                 <div>
                                    <label className='text-xs text-text-secondary ml-1'>Fim (Previsão)</label>
                                    <input
                                       type='date'
                                       value={edu.endDate ? String(edu.endDate).slice(0, 10) : ''}
                                       onChange={(e) => handleComplexItemChange(e, index, 'academicBackground', 'endDate')}
                                       className='w-full bg-bg border border-primary/50 rounded-lg p-2 text-text-secondary'
                                    />
                                 </div>
                                 <div>
                                    <label className='text-xs text-text-secondary ml-1'>Status</label>
                                    <select
                                       value={edu.status}
                                       onChange={(e) => handleComplexItemChange(e, index, 'academicBackground', 'status')}
                                       className='w-full bg-bg border border-primary/50 rounded-lg p-2.5 text-text-secondary focus:outline-primary appearance-none'>
                                       <option value="">Selecione</option>
                                       <option value="Concluído">Concluído</option>
                                       <option value="Em andamento">Em andamento</option>
                                       <option value="Trancado">Trancado</option>
                                    </select>
                                 </div>
                              </div>
                           </div>
                        ))}

                        <button
                           onClick={() => addComplexItem('academicBackground')}
                           className='w-full py-3 border-2 border-dashed border-primary/40 text-primary font-bold rounded-xl hover:bg-primary/10 hover:border-primary transition flex items-center justify-center gap-2'>
                           <FaPlus /> Adicionar Formação
                        </button>
                     </>
                  ) : (
                     <>
                        {data.academicBackground && data.academicBackground.length > 0 ? (
                           data.academicBackground.map((edu, index) => (
                              <div key={index} className='p-4 border-l-4 border-primary/70 bg-bg-elevated/50 rounded-lg'>
                                 <h3 className='text-xl font-bold text-secondary'>{edu.course} ({edu.degree})</h3>
                                 <p className='text-md'>{edu.institution}</p>

                                 <p className='text-sm text-text-secondary'>
                                    {formatDate(edu.startDate)} — {edu.status === 'Concluído' ? formatDate(edu.endDate) : 'Em andamento'}
                                 </p>
                                 <p className='text-sm text-information'>Status: {edu.status}</p>
                              </div>
                           ))
                        ) : (
                           <p className='text-text-secondary italic'>Nenhum histórico acadêmico registrado.</p>
                        )}
                     </>
                  )}

               </div>
            </div>
         </div>
      </div>
   )
}

export default UserProfile
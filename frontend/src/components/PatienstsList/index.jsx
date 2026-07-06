import axios from 'axios'
import { useEffect, useState } from 'react'

import { FaUserAlt } from "react-icons/fa"
import { Link } from 'react-router'
import apiClient from '../../api/api'

const PatientsList = () => {

    const [patients, setPatients] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    const [ages, setAges] = useState({})

    const calculateAge = (birthdate) => {
        if (!birthdate) return "-"

        const today = new Date()

        const birthdateData = new Date(birthdate)

        let age = today.getFullYear() - birthdateData.getFullYear()

        const monthDiff = today.getMonth() - birthdateData.getMonth()

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdateData.getDate())) age--


        return age
    }

    useEffect(() => {

        const fecthPatients = async () => {
            try {
                const response = await apiClient.get("/paciente")
                const patientsData = response.data.paciente
                const calculateAges = {}

                patientsData.forEach(element => {

                    calculateAges[element.id] = calculateAge(element.data_nascimento)

                });

                
               
                setPatients(patientsData)
                setAges(calculateAges)
                console.log(calculateAges);
                

            } catch (error) {
                console.log("Erro ao obter dados dos pacientes", error);


            }
        }
        fecthPatients()
    }, [])


    const handleSearchChange = (e) => {

        setSearchTerm(e.target.value)
    }

    const filteredPatients = patients.filter((patient) => 
        [patient.nome, patient.email, patient.telefone, patient?.healthInsurance, patient?.allergies]
            .filter(Boolean)
            .join(" ")
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    )


    return (
        <div className='bg-white dark:bg-slate-800 shadow rounded-2xl p-6 mt-8 border border-transparent dark:border-slate-700 transition-colors duration-300'>
            <h2 className='text-xl font-semibold text-cyan-800 dark:text-cyan-400 mb-4 '>
                Informações de Pacientes
            </h2>

            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3'> 


            <label htmlFor="search" className='text-gray-700 dark:text-slate-350 font-medium'>
                Buscar Paciente:
            </label>
            <input
                type="text"
                id='search'
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder='Digite nome, e-mail, telefone, convênio ou alergias'
                className='border border-gray-300 dark:border-slate-650 bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100 rounded-lg py-2 w-full sm:w-112.5 focus:ring-2 focus:ring-cyan-600 outline-none px-3 transition-colors'
                />

            </div>
            <div>
                {/* lista de pacientes */}

                {
                    filteredPatients.length > 0 ? (
                        <ul className='divide-y divide-gray-200 dark:divide-slate-700/50'>
                            {
                                filteredPatients.map((patient) => (
                                    <li
                                        key={patient.id}

                                        className='flex flex-col sm:flex-row sm:items-center justify-between py-4'
                                    >
                                        <div
                                            className='flex items-center gap-4'
                                        >
                                            <div
                                                className='bg-cyan-100 dark:bg-slate-700 text-cyan-700 dark:text-cyan-400 rounded-full p-2.5'
                                            >
                                                <FaUserAlt size={16} />

                                            </div>

                                            <div>
                                                <p className='font-semibold text-gray-800 dark:text-slate-100'>{patient.nome}</p>
                                                <p className='text-sm text-gray-650 dark:text-slate-400'>{patient.email}</p>
                                                <p className='text-sm text-gray-650 dark:text-slate-400'>{patient.telefone}</p>
                                            </div>
                                        </div>

                                        <div className='text-sm text-gray-650 dark:text-slate-400 mt-2 sm:mt-0 text-right'>
                                            <p><strong className="text-gray-700 dark:text-slate-300">Idade: </strong>{ages[patient.id] || "-"}</p>
                                            <p><strong className="text-gray-700 dark:text-slate-300">Plano: </strong>{patient?.healthInsurance || "-"}</p>
                                            <Link
                                                to={`/paciente/${patient.id}`}
                                                className='text-cyan-700 dark:text-cyan-400 hover:underline font-semibold'
                                            >
                                                Ver detalhes
                                            </Link>

                                        </div>

                                    </li>
                                )
                                )

                            }
                        </ul>
                    ) : (<p className='text-gray-500 dark:text-slate-400 text-center py-6' >Nenhum paciente encontrado</p>)

                }

            </div>

        </div>
    )
}

export default PatientsList
import axios from 'axios'
import { useEffect, useState } from 'react'

import { FaUserAlt } from "react-icons/fa"
import { Link } from 'react-router'

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
                const response = await axios.get("http://localhost:3000/patients")
                const patientsData = response.data
                const calculateAges = {}

                patientsData.forEach(element => {

                    calculateAges[element.id] = calculateAge(element.birthdate)

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

    const filteredPatients = patients.filter((patients) => [patients.fullName, patients.email, patients.phone].join(" ").toLowerCase().includes(searchTerm.toLowerCase()))


    return (
        <div className='bg-white shadow rounded-2xl p-6 mt-8'>
            <h2 className='text-xl font-semibold text-cyan-800 mb-4 '>
                Informações de Pacientes
            </h2>

            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3'> 


            <label htmlFor="search" className='text-gray-700 font-medium'>
                Buscar Paciente:
            </label>
            <input
                type="text"
                id='search'
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder='Digite o nome, email ou telefone'
                className='border rounded-lg py-2 w-full sm:w-80 focus:ring-2 focus:ring-cyan-600 outline-none'
                />

            </div>
            <div>
                {/* lista de pacientes */}

                {
                    filteredPatients.length > 0 ? (
                        <ul className='divide-y divide-gray-200'>
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
                                                className='bg-cyan-100 text-cyan-700 rounded-full'
                                            >
                                                <FaUserAlt size={20} />

                                            </div>

                                            <div>
                                                <p className='font-semibold text-gray-800'>{patient.fullName}</p>
                                                <p className='text-sm text-gray-600'>{patient.email}</p>
                                                <p className='text-sm text-gray-600'>{patient.phone}</p>
                                            </div>
                                        </div>

                                        <div className='text-sm text-gray-600 mt-2 sm:mt-0 text-right'>
                                            <p><strong>Idade:</strong>{ages[patient.id] || "-"}</p>
                                            <p><strong>Plano:</strong>{patient.healthInsurance || "-"}</p>
                                            <Link
                                                to={`/paciente/${patient.id}`}
                                                className='text-cyan-700'
                                            >
                                                Ver detalhes
                                            </Link>

                                        </div>

                                    </li>
                                )
                                )

                            }
                        </ul>
                    ) : (<p className='text-gray-500 text-center py-6' >Nenum paciente encontrado</p>)

                }

            </div>

        </div>
    )
}

export default PatientsList
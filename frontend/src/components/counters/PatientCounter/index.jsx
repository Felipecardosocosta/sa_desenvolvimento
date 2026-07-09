import axios from 'axios'
import React, { useEffect, useState } from 'react'

import {FaHospitalUser} from 'react-icons/fa'
import apiClient from '../../../api/api'

const PatientCounter = () => {

    const [patientCounter,setPatientCounter] = useState(0)

    useEffect(()=>{
        const fetchPatients = async()=>{
            try {
                const response = await apiClient.get('/paciente')
 
            
                setPatientCounter(response.data.dados.paciente.length)

            } catch (error) {
                console.error("Erro ao obter dados do pacientes ", error)
                
            }
        }
        fetchPatients()
    },[])

  return (
    <div className='bg-white dark:bg-slate-800 shadow rounded-lg p-6 flex flex-col items-center w-60 border border-transparent dark:border-slate-700 transition-colors duration-300'>
        <h2 className='text-xl font-bold flex items-center gap-2 text-gray-800 dark:text-slate-100'>
            <FaHospitalUser className='text-blue-600 dark:text-blue-400'/>
            {patientCounter}

        </h2>
        <p className='text-gray-650 dark:text-slate-400 font-medium'>Pacientes</p>

    </div>
  )
}

export default PatientCounter
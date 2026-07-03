import axios from 'axios'
import React, { useEffect, useState } from 'react'

import { FaRegCalendarCheck } from "react-icons/fa6"

const ConsultCounter = () => {

    const [consultCounter,setConsultsCounter] = useState(0)

    useEffect(()=>{
        const fetchConsult = async()=>{
            try {
                const response = await axios.get('http://localhost:3000/consults')

            
                

                setConsultsCounter(response.data.length)

            } catch (error) {
                console.error("Erro ao obter dados do consulta ", error)
                
            }
        }
        fetchConsult()
    },[])

  return (
    <div className='bg-white dark:bg-slate-800 shadow rounded-lg p-6 flex flex-col items-center w-60 border border-transparent dark:border-slate-700 transition-colors duration-300'>
        <h2 className='text-xl font-bold flex items-center gap-2 text-gray-800 dark:text-slate-100'>
            <FaRegCalendarCheck className='text-blue-600 dark:text-blue-400'/>
            {consultCounter}

        </h2>
        <p className='text-gray-650 dark:text-slate-400 font-medium'>Consultas</p>

    </div>
  )
}

export default ConsultCounter
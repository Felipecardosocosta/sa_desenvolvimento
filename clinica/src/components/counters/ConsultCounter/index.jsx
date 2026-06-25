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
    <div className='bg-white shadow rounded-lg p-6 flex flex-col items-center w-60'>
        <h2 className='text-xl font-bold flex items-center gap-2'>
            <FaRegCalendarCheck className='text-blue-600'/>
            {consultCounter}

        </h2>
        <p>Consultas</p>

    </div>
  )
}

export default ConsultCounter
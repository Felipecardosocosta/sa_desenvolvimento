import axios from 'axios'
import { useEffect, useState } from 'react'
import { BsClipboard2Pulse } from "react-icons/bs"
import apiClient from '../../../api/api'

const ExamsCounter = () => {
    const [examsCounter,setExamsCounter] = useState(0)

    useEffect(()=>{
        const fetchExams = async()=>{
            try {
                const response = await apiClient.get('/exames')


                setExamsCounter(response.data.exames.length)

            } catch (error) {
                console.error("Erro ao obter dados do exames ", error)
                
            }
        }
        fetchExams()
    },[])


  return (
    <div className='bg-white dark:bg-slate-800 shadow rounded-lg p-6 flex flex-col items-center w-60 border border-transparent dark:border-slate-700 transition-colors duration-300'>
        <h2 className='text-xl font-bold flex items-center gap-2 text-gray-800 dark:text-slate-100'>
            <BsClipboard2Pulse className='text-blue-600 dark:text-blue-400'/>
            {examsCounter}

        </h2>
        <p className='text-gray-650 dark:text-slate-400 font-medium'>Exames</p>

    </div>
  )
}

export default ExamsCounter
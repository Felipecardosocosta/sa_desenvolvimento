import axios from 'axios'
import { useEffect, useState } from 'react'
import { BsClipboard2Pulse } from "react-icons/bs"

const ExamsCounter = () => {
    const [examsCounter,setExamsCounter] = useState(0)

    useEffect(()=>{
        const fetchExams = async()=>{
            try {
                const response = await axios.get('http://localhost:3000/exams')


                setExamsCounter(response.data.length)

            } catch (error) {
                console.error("Erro ao obter dados do exames ", error)
                
            }
        }
        fetchExams()
    },[])


  return (
    <div className='bg-white shadow rounded-lg p-6 flex flex-col items-center w-60'>
            <h2 className='text-xl font-bold flex items-center gap-2'>
                <BsClipboard2Pulse className='text-blue-600'/>
                {examsCounter}
    
            </h2>
            <p>Exames</p>
    
        </div>
  )
}

export default ExamsCounter
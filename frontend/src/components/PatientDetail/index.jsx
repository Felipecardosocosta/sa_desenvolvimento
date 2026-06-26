import { useState, useEffect } from "react"
import axios from "axios"

import { useParams } from "react-router"

import { toast } from "react-toastify"

const PatientDetails = () => {

    const { id } = useParams()

    const [patient, setPatient] = useState({})
    const [consults, setConsults] = useState([])
    const [exams, setExams] = useState([])



    //consultas
    const [editingConsult, setEditingConsult] = useState(null)

    const [editingConsultData, setEditingConsultData] = useState({
        patientId: "",
        reason: "",
        date: "",
        time: '',
        description: "",
        medication: "",
        dosagePrecautions: "",
    })


    const [isEditingConsult, SetIsEditingConsult] = useState(false)




    const [editingExamsData, setEditingExamsData] = useState({
        patientId: "",
        name: "",
        date: "",
        time: "",
        type: "",
        laboratory: "",
        documentUrl: '',
        result: "",
    })

    const [isEditingExams, SetIsEditingExams] = useState(false)




    useEffect(() => {

        const fecthPacientDetails = async () => {
            try {
                const patientRes = await axios.get(`http://localhost:3000/patients/${id}`)
                const consultsRes = await axios.get(`http://localhost:3000/consults?patientId${id}`)
                const examsRes = await axios.get(`http://localhost:3000/exams?patientId${id}`)

                setPatient(patientRes.data)
                setConsults(consultsRes.data)
                setExams(examsRes.data)
                


            } catch (error) {
                console.log("Erro ao obter dados detalhes do paciente", error);

            }
        }
        fecthPacientDetails()

    }, [id])




    return (
        <div>
            {patient.fullName}


        </div>
    )
}

export default PatientDetails
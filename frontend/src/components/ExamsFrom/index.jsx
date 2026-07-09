import { useEffect, useState } from 'react'
import Modal from "../Modal"
import axios from 'axios'
import { toast } from 'react-toastify'
import apiClient from '../../api/api'

function ExamsForm() {

    const [searchTerm, setSearchTerm] = useState('')
    const [patients, setPatients] = useState([])
    const [selectedPatient, setSelectedPatient] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isSaving, setIsSaving] = useState(false)


    const [formData, setFormData] = useState({
        name: '',
        date: '',
        time: '',
        laboratory: '',
        documentUrl: '',
        result: '',
    })

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await apiClient.get("/paciente")

                setPatients(response.data.dados.paciente)

            } catch (error) {

                console.log("Erro ao obter dados dos pacientes")

            }

        }

        fetchPatients()
    }, [])


    const handleSearchChange = (e) => {

        setSearchTerm(e.target.value)
    }

    const filteredPatients = patients.filter(
        (patient) =>
            patient.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
            patient.id.toString().includes(searchTerm)
    )

    const handleSelectPatient = (patient) => {
        setSelectedPatient(patient)
        setIsModalOpen(true)

    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setSelectedPatient(null)
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))

    }

    const resetForm = () => {
        setFormData({
            name: '',
            date: '',
            time: '',
            type: '',
            laboratory: '',
            documentUrl: '',
            result: '',

        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!selectedPatient) return

        const datetimeString = `${formData.date}T${formData.time}`;
        const localDateTime = new Date(datetimeString);

        try {

            setIsSaving(true)

            const dataToSave = {
                patientId: selectedPatient.id,
                tipo_exame:formData.name,
                valor:0,
                descricao: formData.laboratory,
                resultado: formData.result,
                data_exame: localDateTime.toISOString(),
                
            }

            await apiClient.post("/exames", dataToSave)

            toast.success("Exame cadastrada com sucesso!", {
                autoClose: 2000,
                hideProgressBar: true
            })

            resetForm()
            handleCloseModal()


        } catch (error) {
            console.error("Erro ao cadastrar Exame!")
            toast.error("Erro ao cadastrar Exame!", {
                autoClose: 2000,
                hideProgressBar: true
            })
        }

    }

    return (


        <section className='p-6 text-gray-800'>
            {/* campo de busca */}

            <div className='mb-6'>
                <label
                    htmlFor=""
                    className='block text-sm font-semibold mb-2  text-gray-800 dark:text-cyan-400'
                >
                    Buscar paciente para cadastrar a exames

                </label>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder='Digite o nome ou o registro do paciente'
                    className='w-full  p-2 border border-gray-300 dark:border-slate-650 bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600 transition-colors'
                />

            </div>

            <ul className='space-y-3'>
                {
                    filteredPatients.map((patient) => (
                        <li
                            key={patient.id}
                            className='
                            p-4 
                            border 
                            rounded-lg 
                          bg-white
                          dark:bg-slate-800
                            border-gray-100 
                            dark:border-slate-700

                            shadow-sm 
                            hover:shadow-md
                            flex 
                            justify-between 
                            items-center 
                            hover:bg-gray-50 
                            hover:dark:bg-slate-700
                            transition'
                        >

                            <div>
                                <p className="text-sm text-gray-550 dark:text-slate-400">
                                    <strong className="text-gray-700 dark:text-slate-300">Registro:</strong> {patient?.id}
                                </p>
                                <p className="text-gray-700 dark:text-slate-300">
                                    <strong className="text-gray-900 dark:text-slate-100" > Nome:</strong> {patient?.nome}
                                </p>
                                <p className="text-gray-700 dark:text-slate-300">
                                    <strong className="text-gray-900 dark:text-slate-100">Convênio:</strong> {patient?.healthInsurance}
                                </p>

                            </div>

                            <button
                                className='
                                bg-cyan-700 
                                text-white 
                                px-3
                                p-2 
                                font-bold
                                rounded-lg 
                                hover:bg-cyan-600 
                                transition-colors
                                cursor-pointer'
                                onClick={() => handleSelectPatient(patient)}

                            >
                                Selecionar

                            </button>

                        </li>
                    )
                    )
                }

            </ul>

            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            >
                {
                    selectedPatient &&
                    (
                        <>
                            <h2 className='text-lg font-bold mb-4 text-cyan-700  dark:text-cyan-400'>
                                Cadastrar exame para {selectedPatient.nome}

                            </h2>

                            <div className='mb-4 text-sm text-gray-700'>
                                <p className='text-gray-800 dark:text-slate-100'>
                                    <strong >Email:</strong> {selectedPatient.email}
                                </p>
                                <p className='text-gray-800 dark:text-slate-100'>
                                    <strong>Telefone:</strong> {selectedPatient.telefone}
                                </p>

                            </div>

                            <form
                                onSubmit={handleSubmit}
                                className='space-y-4'
                            >
                                <div>

                                    <label htmlFor='name' className="block text-sm font-medium text-gray-700 dark:text-slate-300 capitalize mb-1">
                                        Nome do Exame:
                                    </label>

                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={formData.reason}
                                        onChange={handleInputChange}
                                        className='w-full p-2 border rounded-lg focus:ring-cyan-600 outline-none  dark:border-slate-100 
                                         dark:text-slate-100'
                                        required
                                    />
                                </div>

                                <div className='grid grid-cols-2 gap-4'>
                                    <div>

                                        <label htmlFor='date' className="block text-sm font-medium text-gray-700 dark:text-slate-300 capitalize mb-1">
                                            Data:
                                        </label>

                                        <input
                                            type="date"
                                            name="date"
                                            id="date"
                                            value={formData.date}
                                            onChange={handleInputChange}
                                            className='w-full p-2 border rounded-lg focus:ring-cyan-600 outline-none dark:border-slate-100  dark:text-slate-100'
                                            required
                                        />
                                    </div>
                                    <div>

                                        <label htmlFor='time' className="block text-sm font-medium text-gray-700 dark:text-slate-300 capitalize mb-1">
                                            Hora:
                                        </label>

                                        <input
                                            type="time"
                                            name="time"
                                            id="time"
                                            value={formData.time}
                                            onChange={handleInputChange}
                                            className='w-full p-2 border rounded-lg focus:ring-cyan-600 outline-none dark:border-slate-100  dark:text-slate-100'
                                            required
                                        />
                                    </div>

                                </div>

                                <div>

                                    <label htmlFor='type' className="block text-sm font-medium text-gray-700 dark:text-slate-300 capitalize mb-1">
                                        Tipo de exame:
                                    </label>

                                    <input

                                        type="text"
                                        name="type"
                                        id="type"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        className='w-full p-2 border rounded-lg focus:ring-cyan-600 outline-none resize-none dark:border-slate-100  dark:text-slate-100'
                                        required
                                    />
                                </div>


                                <div>

                                    <label htmlFor='laboratory' className="block text-sm font-medium text-gray-700 dark:text-slate-300 capitalize mb-1">
                                        Laboratorio:
                                    </label>

                                    <input
                                        rows={3}
                                        type="text"
                                        name="laboratory"
                                        id="laboratory"
                                        value={formData.medication}
                                        onChange={handleInputChange}
                                        className='w-full p-2 border rounded-lg focus:ring-cyan-600 outline-none dark:border-slate-100  dark:text-slate-100 '
                                        required
                                    />
                                </div>
                                <div>

                                    <label htmlFor='documentUrl' className="block text-sm font-medium text-gray-700 dark:text-slate-300 capitalize mb-1">
                                        Url do documento:
                                    </label>

                                    <input

                                        type="text"
                                        name="documentUrl"
                                        id="documentUrl"
                                        value={formData.dosagePrecautions}
                                        onChange={handleInputChange}
                                        className='w-full p-2 border rounded-lg focus:ring-cyan-600 outline-none dark:border-slate-100  dark:text-slate-100'
                                        required
                                    />
                                </div>
                                <div>

                                    <label htmlFor='result' className="block text-sm font-medium text-gray-700 dark:text-slate-300 capitalize mb-1">
                                        Resultado:
                                    </label>

                                    <textarea
                                        rows={3}
                                        type="text"
                                        name="result"
                                        id="result"
                                        value={formData.dosagePrecautions}
                                        onChange={handleInputChange}
                                        className='w-full p-2 border rounded-lg focus:ring-cyan-600 outline-none resize-none dark:border-slate-100  dark:text-slate-100'
                                        required
                                    />
                                </div>

                                {/* botao de envio */}

                                <div className='flex justify-end gap-3 pt-4' >

                                    <button
                                        onClick={handleCloseModal}
                                        type='button'
                                        className='px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400  transition'
                                    >
                                        Fechar

                                    </button>
                                    <button
                                        type='submit'
                                        disabled={isSaving}
                                        className='px-4 py-2 bg-cyan-700 text-white rounded-lg hover:bg-cyan-600 disabled:opacity-50'
                                    >
                                        {isSaving ? "Salvando..." : "Salvar"}

                                    </button>

                                </div>





                            </form>

                        </>
                    )
                }

            </Modal>

        </section>
    )
}

export default ExamsForm
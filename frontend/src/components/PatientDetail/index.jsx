import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import apiClient from '../../api/api'

const PatientDetails = () => {
  const { id } = useParams()
  const [patient, setPatient] = useState({})
  const [consults, setConsults] = useState([])
  const [exams, setExams] = useState([])

  

  const [editingConsult, setEditingConsult] = useState(null)
  const [editConsultData, setEditConsultData] = useState({
    reason: '',
    date: '',
    time: '',
    description: '',
    medication: '',
    dosagePrecautions: '',
  })
  const [isEditingConsult, setIsEditingConsult] = useState(false)

  const [editingExam, setEditingExam] = useState(null)
  const [editExamData, setEditExamData] = useState({
    name: '',
    date: '',
    time: '',
    type: '',
    laboratory: '',
    documentUrl: '',
    results: '',
  })
  const [isEditingExam, setIsEditingExam] = useState(false)

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const patientRes = await apiClient.get(`/paciente/${id}`)
        const consultsRes = await apiClient.get(`/consulta/patientId=${id}`)
        const examsRes = await apiClient.get(`/exames/patientId=${id}`)
       
        
        setPatient(patientRes.data.paciente)
        setConsults(consultsRes.data.consulta)
        setExams(examsRes.data.exames)
      } catch (error) {
        console.error('Erro ao obter os detalhes do paciente:', error)
      }
    }

    fetchPatientDetails()
  }, [id])

  const handleEditConsult = (consult) => {
    setEditingConsult(consult)
    setEditConsultData({
      reason: consult.reason,
      date: consult.date,
      time: consult.time,
      description: consult.description,
      medication: consult.medication,
      dosagePrecautions: consult.dosagePrecautions,
    })
    setIsEditingConsult(true)
  }

  const handleUpdateConsult = async (e) => {
    e.preventDefault()
    try {
      if (!editingConsult) return

      const updatedConsult = {
        ...editingConsult,
        ...editConsultData,
      }

      await axios.put(`http://localhost:3000/consults/${editingConsult.id}`, updatedConsult)
      setConsults((prev) =>
        prev.map((c) => (c.id === editingConsult.id ? updatedConsult : c))
      )

      toast.success('Consulta atualizada com sucesso!')
      setIsEditingConsult(false)
      setEditingConsult(null)
    } catch {
      toast.error('Erro ao atualizar a consulta!')
    }
  }

  const handleDeleteConsult = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/consults/${id}`)
      setConsults((prev) => prev.filter((c) => c.id !== id))
      toast.success('Consulta excluída com sucesso!')
    } catch {
      toast.error('Erro ao excluir consulta!')
    }
  }

  const handleEditExam = (exam) => {
    setEditingExam(exam)
    setEditExamData({
      name: exam.name,
      date: exam.date,
      time: exam.time,
      type: exam.type,
      laboratory: exam.laboratory,
      documentUrl: exam.documentUrl,
      results: exam.results,
    })
    setIsEditingExam(true)
  }

  const handleUpdateExam = async (e) => {
    e.preventDefault()
    try {
      if (!editingExam) return

      const updatedExam = {
        ...editingExam,
        ...editExamData,
      }

      await axios.put(`http://localhost:3000/exams/${editingExam.id}`, updatedExam)
      setExams((prev) =>
        prev.map((exam) => (exam.id === editingExam.id ? updatedExam : exam))
      )

      toast.success('Exame atualizado com sucesso!')
      setIsEditingExam(false)
      setEditingExam(null)
    } catch {
      toast.error('Erro ao atualizar o exame!')
    }
  }

  const handleDeleteExam = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/exams/${id}`)
      setExams((prev) => prev.filter((e) => e.id !== id))
      toast.success('Exame excluído com sucesso!')
    } catch {
      toast.error('Erro ao excluir o exame!')
    }

  }
  const handleExportPDF = () => {window.print()}
  
    if (!patient) return <p className="p-6 text-center text-gray-500 dark:text-slate-400">Carregando...</p>

    return (
      <section className="p-6 max-w-5xl mx-auto dark:text-slate-100">
        {/* Cabeçalho com o botão de exportar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 print:hidden">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-cyan-400">Prontuário Médico</h2>
          <button
            onClick={handleExportPDF}
            className="bg-cyan-700 hover:bg-cyan-800 dark:bg-cyan-600 dark:hover:bg-cyan-700 text-white font-semibold px-4 py-2 rounded-lg shadow-sm transition duration-200 cursor-pointer text-sm sm:text-base print:hidden"
          >
            Exportar PDF do prontuário
          </button>
        </div>

        {/* Cartão de Informações Pessoais */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-6 mb-8 border border-gray-100 dark:border-slate-700 transition-colors duration-300">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-slate-100 mb-4">{patient.fullName}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm sm:text-base text-gray-700 dark:text-slate-300">
            <p><span className="font-semibold text-gray-800 dark:text-slate-100">Convênio:</span> {patient.healthInsurance || '-'}</p>
            <p><span className="font-semibold text-gray-800 dark:text-slate-100">Alergias:</span> {patient.allergies || '-'}</p>
            <p><span className="font-semibold text-gray-800 dark:text-slate-100">Telefone:</span> {patient.phone || '-'}</p>
            <p><span className="font-semibold text-gray-800 dark:text-slate-100">E-mail:</span> {patient.email || '-'}</p>
            <p><span className="font-semibold text-gray-800 dark:text-slate-100">CPF:</span> {patient.cpf || '-'}</p>
            <p><span className="font-semibold text-gray-800 dark:text-slate-100">RG:</span> {patient.rg || '-'}</p>
            <p><span className="font-semibold text-gray-800 dark:text-slate-100">Contato de Emergência:</span> {patient.emergencyContact || '-'}</p>
          </div>
        </div>

        {/* Consultas */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-6 mb-8 border border-gray-100 dark:border-slate-700 transition-colors duration-300">
          <h3 className="text-xl font-semibold text-gray-755 dark:text-slate-200 mb-4">Histórico de Consultas</h3>

          {isEditingConsult ? (
            <form onSubmit={handleUpdateConsult} className="space-y-4 print:hidden">
              {Object.keys(editConsultData).map((key) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 capitalize mb-1">
                    {key === 'dosagePrecautions'
                      ? 'Dosagem e Precauções'
                      : key.charAt(0).toUpperCase() + key.slice(1)}
                  </label>
                  <input
                    type={key.includes('date') ? 'date' : key.includes('time') ? 'time' : 'text'}
                    value={editConsultData[key]}
                    onChange={(e) =>
                      setEditConsultData({ ...editConsultData, [key]: e.target.value })
                    }
                    className="w-full border border-gray-300 dark:border-slate-650 rounded-lg px-3 py-2 text-sm bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 outline-none transition-colors duration-200"
                    required
                  />
                </div>
              ))}

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition cursor-pointer"
                >
                  Salvar
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditingConsult(false)}
                  className="bg-gray-300 hover:bg-gray-400 dark:bg-slate-700 dark:hover:bg-slate-600 text-gray-800 dark:text-slate-200 px-4 py-2 rounded-lg transition cursor-pointer"
                >
                  Cancelar
                </button>
              </div>
            </form>
          ) : consults.length === 0 ? (
            <p className="text-gray-500 dark:text-slate-400">Nenhuma consulta encontrada.</p>
          ) : (
            consults.map((c) => (
              <div
                key={c.id}
                className="border border-gray-200 dark:border-slate-700 rounded-xl p-4 mb-4 bg-gray-50 dark:bg-slate-800/50 hover:bg-gray-100 dark:hover:bg-slate-700/50 transition-colors duration-200"
              >
                <p className="text-gray-700 dark:text-slate-100"><strong>Consulta:</strong> {c.reason}</p>
                <p className="text-gray-700 dark:text-slate-100"><strong>Data:</strong> {c.date} - {c.time}</p>
                <p className="text-gray-700 dark:text-slate-100"><strong>Descrição:</strong> {c.description}</p>
                <p className="text-gray-700 dark:text-slate-100"><strong>Medicação:</strong> {c.medication}</p>
                <p className="text-gray-700 dark:text-slate-100"><strong>Dosagem e Precauções:</strong> {c.dosagePrecautions}</p>
                <div className="flex gap-3 mt-3 print:hidden">
                  <button
                    onClick={() => handleEditConsult(c)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm cursor-pointer"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeleteConsult(c.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm cursor-pointer"
                  >
                    Deletar
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Exames */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-6 border border-gray-100 dark:border-slate-700 transition-colors duration-300">
          <h3 className="text-xl font-semibold text-gray-755 dark:text-slate-200 mb-4">Histórico de Exames</h3>

          {isEditingExam ? (
            <form onSubmit={handleUpdateExam} className="space-y-4 print:hidden">
              {Object.keys(editExamData).map((key) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 capitalize mb-1">
                    {key === 'documentUrl'
                      ? 'URL do Documento'
                      : key.charAt(0).toUpperCase() + key.slice(1)}
                  </label>
                  {key === 'results' ? (
                    <textarea
                      value={editExamData[key]}
                      onChange={(e) =>
                        setEditExamData({ ...editExamData, [key]: e.target.value })
                      }
                      className="w-full border border-gray-300 dark:border-slate-650 rounded-lg px-3 py-2 text-sm bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 outline-none transition-colors duration-200"
                      rows="3"
                      required
                    />
                  ) : (
                    <input
                      type={key.includes('date') ? 'date' : key.includes('time') ? 'time' : 'text'}
                      value={editExamData[key]}
                      onChange={(e) =>
                        setEditExamData({ ...editExamData, [key]: e.target.value })
                      }
                      className="w-full border border-gray-300 dark:border-slate-650 rounded-lg px-3 py-2 text-sm bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 outline-none transition-colors duration-200"
                      required={key !== 'documentUrl'}
                    />
                  )}
                </div>
              ))}

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition cursor-pointer"
                >
                  Salvar
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditingExam(false)}
                  className="bg-gray-300 hover:bg-gray-400 dark:bg-slate-700 dark:hover:bg-slate-600 text-gray-800 dark:text-slate-200 px-4 py-2 rounded-lg transition cursor-pointer"
                >
                  Cancelar
                </button>
              </div>
            </form>
          ) : exams.length === 0 ? (
            <p className="text-gray-500 dark:text-slate-400">Nenhum exame encontrado.</p>
          ) : (
            exams.map((exam) => (
              <div
                key={exam.id}
                className="border border-gray-200 dark:border-slate-700 rounded-xl p-4 mb-4 bg-gray-50 dark:bg-slate-800/50 hover:bg-gray-100 dark:hover:bg-slate-700/50 transition-colors duration-200"
              >
                <p className="text-gray-700 dark:text-slate-100"><strong>Exame:</strong> {exam.name}</p>
                <p className="text-gray-700 dark:text-slate-100"><strong>Data:</strong> {exam.date} - {exam.time}</p>
                <p className="text-gray-700 dark:text-slate-100"><strong>Tipo:</strong> {exam.type}</p>
                <p className="text-gray-700 dark:text-slate-100"><strong>Laboratório:</strong> {exam.laboratory}</p>
                <p className="text-gray-700 dark:text-slate-100"><strong>Documento:</strong> {exam.documentUrl}</p>
                <p className="text-gray-700 dark:text-slate-100"><strong>Resultados:</strong> {exam.results}</p>
                <div className="flex gap-3 mt-3 print:hidden">
                  <button
                    onClick={() => handleEditExam(exam)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm cursor-pointer"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeleteExam(exam.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm cursor-pointer"
                  >
                    Deletar
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
      </section>
    )
  }


export default PatientDetails

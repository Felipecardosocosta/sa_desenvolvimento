import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import axios from "axios";

const MedicalRecordList = () => {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get("http://localhost:3000/patients");
        setPatients(response.data);
      } catch (error) {
        console.error("Erro ao obter dados dos pacientes:", error);
      }

      
    };

    fetchPatients();
  }, []);
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPatients = patients.filter((patient) => {
    const term = searchTerm.toLowerCase();
    return (
      patient.fullName.toLowerCase().includes(term) ||
      patient.id.toString().includes(term) ||
      (patient.phone && patient.phone.toLowerCase().includes(term)) ||
      (patient.healthInsurance && patient.healthInsurance.toLowerCase().includes(term)) ||
      (patient.allergies && patient.allergies.toLowerCase().includes(term))
    );
  });

  return (
    <section className="p-6 bg-gray-50 dark:bg-slate-900 rounded-lg shadow-md transition-colors duration-300">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-cyan-400">
        Listagem de Prontuários
      </h2>

      {/* Campo de busca */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <label htmlFor="search" className="text-gray-700 dark:text-slate-300 font-medium">
          Buscar Paciente:
        </label>
        <input
          type="text"
          id="search"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Digite nome, registro, telefone, convênio ou alergias"
          className="w-full sm:w-1/2 p-2 border border-gray-300 dark:border-slate-650 bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600 transition-colors"
        />
      </div>

      {/* Lista de pacientes */}
      <ul className="space-y-4">
        {filteredPatients.length > 0 ? (
          filteredPatients.map((patient) => (
            <li
              key={patient.id}
              className="p-4
               bg-white
              dark:bg-slate-800
              rounded-lg 
              shadow-sm 
              border 
              border-gray-100 
              dark:border-slate-700 
              hover:shadow-md 
              transition-all 
              duration-300"
            >
              <p className="text-sm text-gray-550 dark:text-slate-400">
                <strong className="text-gray-700 dark:text-slate-300">Registro:</strong> {patient.id}
              </p>
              <p className="text-gray-700 dark:text-slate-300">
                <strong className="text-gray-900 dark:text-slate-100">Nome:</strong> {patient.fullName}
              </p>
              <p className="text-gray-700 dark:text-slate-300">
                <strong className="text-gray-900 dark:text-slate-100">Convênio:</strong> {patient.healthInsurance}
              </p>
              <Link
                to={`/paciente/${patient.id}`}
                className="inline-block mt-2 text-cyan-700 dark:text-cyan-400 font-semibold hover:underline"
              >
                Ver detalhes
              </Link>
            </li>
          ))
        ) : (
          <p className="text-gray-600 dark:text-slate-400">Nenhum paciente encontrado.</p>
        )}
      </ul>
    </section>
  );
};

export default MedicalRecordList;
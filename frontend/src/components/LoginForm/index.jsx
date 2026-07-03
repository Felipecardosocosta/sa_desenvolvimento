import React, { useEffect, useState } from 'react'
import { LabelInput } from '../LabelInput/LabelInput'
import { useAuth } from '../../contexts/AuthContext'
import { toast } from 'react-toastify'

import { Link, Navigate, useNavigate } from 'react-router'
import axios from 'axios'
import Modal from '../Modal'
import RegisterUser from '../RegisterUser'
import apiClient from '../../api/api'

export const LoginForm = () => {

  const [email, setEmail] = useState('')

  const [password, setPassword] = useState('')

  const { login, user } = useAuth()

  const navigate = useNavigate()

  const [isModalOpen, setIsMotalOpen] = useState(false)

  useEffect(() => {
    if (user) {
      navigate('/dashboard')
    }


  }, [user, navigate])


  const handleSubmit = async (e) => {
    e.preventDefault()

    try {

      const response = await apiClient.post('/login', {
        email, senha: password
      })


      if (response.data.length === 0) {

        toast.error("Usuario não encontrado. Verifique o email e senha", { autoClose: 3000, hideProgressBar: true })
        return
      }

      toast.success("Login realizado com sucesso!", {
        autoClose: 2000
      }
      )

      localStorage.setItem("accessToken", response?.data?.accessToken)
      localStorage.setItem("refreshToken", response?.data?.refreshToken)

      login(email)
      navigate('/dashboard')


    } catch (error) {

      toast.error("Erro interno no servidor", {
        autoClose: 3000,

      })

    }

  }

  return (

    <div className='max-w-md w-full mx-auto bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg border border-transparent dark:border-slate-700 transition-colors duration-300'>
      <h1 className='text-2xl font-bold text-center mb-6 text-cyan-800 dark:text-cyan-400' >Login</h1>

      <form onSubmit={handleSubmit}
        className='space-y-4'
      >
        <LabelInput
          id={"email"}
          type={'email'}
          name={'email'}
          text={"Email"}
          required
          value={email}
          setValue={setEmail}

        />
        <LabelInput
          id={"password"}
          type={'password'}
          name={'senha'}
          text={"Senha"}
          minLength={8}
          required
          value={password}
          setValue={setPassword}
        />


        <button
          type='submit'
          className='bg-cyan-700 p-2 px-15 w-full rounded-lg text-white font-bold  hover:bg-cyan-800 transition-colors cursor-pointer  '

        >
          Entrar
        </button>
      </form>
      <div className='flex justify-between mt-4 text-sm'


      >
        <button
          className='text-cyan-700 dark:text-cyan-400 hover:underline cursor-pointer'
          onClick={() => toast.info("Funcionalidade em desenvolvimento")}
        >
          Esqueceu sua senha?

        </button>


        <button
          onClick={() => setIsMotalOpen(true)}
          className='text-cyan-700 dark:text-cyan-400 hover:underline cursor-pointer'
        >
          Criar Conta


        </button>



      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsMotalOpen(false)}

      >
        <RegisterUser />


      </Modal>


    </div>
  )
}

import React, { useState } from 'react'
import { LabelInput } from '../LabelInput/LabelInput'
import { toast } from 'react-toastify'
import axios from 'axios'
import apiClient from '../../api/api'

const RegisterUser = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setconfirmPassword] = useState("")




    const [isPassworddMatch, setIsPasswordMatch] = useState(true)

    const [isSaving, setIsSaving] = useState(false)

    const isPasswordValid = () => password.length >= 8 && password === confirmPassword

    const resetForm = () => {
        setEmail("")
        setPassword("")
        setconfirmPassword("")
        setIsPasswordMatch(true)
    }


    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!isPasswordValid()) {
            setIsPasswordMatch(false)

            return

        }

        setIsSaving(true)

        try {
            await apiClient.post('/cadastro', {
                email, senha:password, nome:""
            })

            setIsSaving(false)
            resetForm()
            toast.success("Usuaro Criado com Sucesso", {
                autoClose: 2000,
                hideProgressBar: true
            })

        } catch (error) {
            console.error(error)
            toast.error("Erro ao criar usaurio! ", {
                autoClose: 2000,
                hideProgressBar: true
            })
            setIsSaving(false)
        }

    }


    return (


        <div
            className='w-full max-w-md p-6 bg-white rounded-xl '

        >
            <h2
                className='text-2xl font-bold mb-6 text-center'
            >
                Criar Usuário

            </h2>

            <form onSubmit={handleSubmit}>
                <fieldset>
                    <LabelInput
                        id={"email"}
                        type={"email"}
                        name={"Email"}
                        text={"Email"}
                        value={email}
                        setValue={setEmail}

                        required

                    />
                </fieldset>

                <fieldset>
                    <LabelInput
                        id={"password"}
                        type={'password'}
                        name={'senha'}
                        text={"Senha"}
                        value={password}
                        setValue={setPassword}
                        minLength={8}
                        required
                    />
                </fieldset>
                <fieldset>
                    <LabelInput
                        id={"confirmPassword"}
                        type={'password'}
                        name={'senha'}
                        text={"Confirme Senha"}
                        value={confirmPassword}
                        setValue={setconfirmPassword}
                        minLength={8}
                        required
                    />
                    {!isPassworddMatch && (
                        <p className='text-red-500 tesxt-sm mt-1' >As senhas não correspondem</p>
                    )}
                </fieldset>

                <div>

                    <button
                        type='submit'
                        disabled={isSaving}
                        className={`w-full p-2 rounded-lg text-white mt-4 ${isSaving ?
                            'bg-gray-400 cursor-not-allowed' :
                            "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                            } transition-colors`}

                    >
                        {isSaving ? "Salvando ...." : "Criar Usuario"}

                    </button>

                </div>


            </form>






        </div>
    )
}

export default RegisterUser
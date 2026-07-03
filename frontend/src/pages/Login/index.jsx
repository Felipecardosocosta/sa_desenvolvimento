import React from 'react'
import logo from "../../assets/imgs/logo-clinica.png"
import { LoginForm } from '../../components/LoginForm'
import { useTheme } from '../../contexts/ThemeContext'
import { FaSun, FaMoon } from 'react-icons/fa'

const Login = () => {
    const { theme, toggleTheme } = useTheme()

    return (
        <div className='relative min-h-screen flex bg-gray-100 dark:bg-slate-900 text-gray-900 dark:text-slate-100 transition-colors duration-300'>
            {/* Botão de alternar tema */}
            <div className='absolute top-4 right-4 z-10'>
                <button
                    onClick={toggleTheme}
                    className='p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-slate-800 rounded-full transition-colors cursor-pointer shadow-sm bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700'
                    title={theme === 'light' ? 'Ativar modo escuro' : 'Ativar modo claro'}
                    aria-label="Alternar tema"
                >
                    {theme === 'light' ? <FaMoon size={18} /> : <FaSun size={18} />}
                </button>
            </div>

            <div className='hidden md:flex w-1/2 bg-gray-200 dark:bg-slate-800 flex-col items-center justify-center p-8 transition-colors duration-300 border-r border-gray-250 dark:border-slate-700'>
                <img src={logo} alt="clinica" className='mb-6' />
            </div>

            <div className='flex w-full md:w-1/2 items-center justify-center p-8'>
                <LoginForm />
            </div>
        </div>
    )
}

export default Login
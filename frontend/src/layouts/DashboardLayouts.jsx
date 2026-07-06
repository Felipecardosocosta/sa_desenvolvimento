import { useState } from 'react'
import { Outlet } from 'react-router'
import { FaSun, FaMoon } from 'react-icons/fa'
import { MdMenu } from 'react-icons/md'

import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'
import SideMenu from '../components/SideMenu'

const DashboardLayouts = () => {
    const { user, logout } = useAuth()
    const { theme, toggleTheme } = useTheme()
    const [isMobileOpen, setIsMobileOpen] = useState(false)

    return (
        <div className='flex min-h-screen bg-gray-100 dark:bg-slate-900 transition-colors duration-300 print:bg-white print:block' >
            {/* {barra lateral} */}
            
           <SideMenu isMobileOpen={isMobileOpen} onCloseMobile={() => setIsMobileOpen(false)} />


            {/* { Conteudo principal } */}

            <main className='flex-1 flex flex-col'>

                <header className='flex justify-between items-center bg-white dark:bg-slate-800 p-4 shadow transition-colors duration-300 print:hidden'>

                    <div className='flex items-center'>
                        <button
                            onClick={() => setIsMobileOpen(true)}
                            className='sm:hidden p-2 mr-2 text-cyan-800 dark:text-cyan-400 hover:bg-gray-100 dark:hover:bg-slate-700 rounded transition-colors cursor-pointer flex items-center justify-center'
                            aria-label="Abrir menu"
                        >
                            <MdMenu size={24} />
                        </button>
                        <h1 className='text-xl font-bold text-cyan-800 dark:text-cyan-400' >Painel do Sistema</h1>
                    </div>
                    {
                        user && (
                            <div className='flex items-center gap-4 '>
                                <span className='text-gray-700 dark:text-slate-300'>Bem Vindo, {user.email} </span>

                                <button
                                    onClick={toggleTheme}
                                    className='p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full transition-colors cursor-pointer'
                                    title={theme === 'light' ? 'Ativar modo escuro' : 'Ativar modo claro'}
                                    aria-label="Alternar tema"
                                >
                                    {theme === 'light' ? <FaMoon size={18} /> : <FaSun size={18} />}
                                </button>

                                <button
                                    onClick={logout}
                                    className='px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition cursor-pointer'

                                >
                                    Sair
                                </button>

                            </div>
                        )
                    }
                </header>

             {/* Paginas internar do dashboard */}

             <section className='flex-1 p-6 overflow-y-auto print:p-0 print:overflow-visible'>

                <Outlet/>

             </section>

            </main>
        </div>
    )
}

export default DashboardLayouts
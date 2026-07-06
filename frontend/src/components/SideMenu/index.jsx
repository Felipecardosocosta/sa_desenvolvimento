import { Link, useNavigate, NavLink } from 'react-router'
import {
    MdDashboard,
    MdExitToApp,
    MdMenu,
    MdClose
} from 'react-icons/md'

import {
    FaUserPlus,
    FaListAlt,
    FaCalendarCheck
} from 'react-icons/fa'

import { useAuth } from '../../contexts/AuthContext'
import { useState } from 'react'

import { IMaskInput } from 'react-imask';



const SideMenu = ({ isMobileOpen, onCloseMobile }) => {
    const navigate = useNavigate()

    const { logout } = useAuth()

    // controle do menu sanfonado
    const [isCollapsed, setIsCollapsed] = useState(false)

    // função do logout
    const handleLogout = () => {
        logout()
        if (onCloseMobile) onCloseMobile()
        navigate('/')
    }

    // função toggle menu ou fechar se for mobile
    const handleToggleOrClose = () => {
        if (isMobileOpen && onCloseMobile) {
            onCloseMobile()
        } else {
            setIsCollapsed(!isCollapsed)
        }
    }

    // função para fechar o menu ao clicar em links (apenas se for mobile)
    const handleLinkClick = () => {
        if (onCloseMobile) {
            onCloseMobile()
        }
    }

    const showCloseIcon = isMobileOpen || !isCollapsed
    const isMenuTextVisible = isMobileOpen || !isCollapsed

    // Define as classes do container de forma responsiva
    const sidebarClasses = isMobileOpen
        ? 'fixed inset-0 z-50 w-full h-full flex bg-cyan-800 dark:bg-cyan-950 text-white flex-col justify-between transition-all duration-300 print:hidden'
        : `bg-cyan-800 dark:bg-cyan-950 text-white flex-col justify-between transition-all duration-300 print:hidden hidden sm:flex ${
              isCollapsed ? 'w-14' : 'w-64'
          }`

    return (
        <aside className={sidebarClasses}>
            {/* topo - botão toggle ou fechar no mobile */}
            <div className='p-4 flex items-center justify-between border-b border-cyan-700 dark:border-cyan-900'>
                {
                    isMenuTextVisible && (
                        <h1 className='text-lg font-bold'>Clínica +</h1>
                    )
                }
                <button
                    onClick={handleToggleOrClose}
                    className='text-white hover:text-cyan-300 focus:outline-none cursor-pointer'
                >
                    {showCloseIcon ? <MdClose size={24} /> : <MdMenu size={24} />}
                </button>
            </div>

            {/* Menu */}
            <nav className='flex-1 p-4 space-y-4 overflow-y-auto'>
                <ul className='space-y-3'>
                    <li>
                        <NavLink
                            to="/dashboard"
                            onClick={handleLinkClick}
                            className={({ isActive }) =>
                                `flex gap-2 hover:text-cyan-300 ${isActive ? "text-cyan-300" : "text-white"
                                }`
                            }
                        >
                            <MdDashboard size={20} />
                            {isMenuTextVisible && <span>Início</span>}
                        </NavLink>


                    </li>
                    <li>
                        <NavLink
                            to="/prontuarios"
                            onClick={handleLinkClick}
                            className={({ isActive }) =>
                                `flex gap-2 hover:text-cyan-300 ${isActive ? "text-cyan-300" : "text-white"
                                }`
                            }
                        >
                            <FaCalendarCheck size={20} />
                            {isMenuTextVisible && <span>Prontuários</span>}
                        </NavLink>


                    </li>
                    <li>
                        <NavLink
                            to="/pacientes"
                            onClick={handleLinkClick}
                            className={({ isActive }) =>
                                `flex gap-2 hover:text-cyan-300 ${isActive ? "text-cyan-300" : "text-white"
                                }`
                            }
                        >
                            <FaUserPlus size={20} />
                            {isMenuTextVisible && <span>Registrar Paciente</span>}
                        </NavLink>

                    </li>
                    <li>
                        <NavLink
                            to="/consultas"
                            onClick={handleLinkClick}
                            className={({ isActive }) =>
                                `flex gap-2 hover:text-cyan-300 ${isActive ? "text-cyan-300" : "text-white"
                                }`
                            }
                        >
                            <MdMenu size={20} />
                            {isMenuTextVisible && <span>Consultas</span>}
                        </NavLink>


                    </li>
                    <li>
                        <NavLink
                            to="/exames"
                            onClick={handleLinkClick}
                            className={({ isActive }) =>
                                `flex gap-2 hover:text-cyan-300 ${isActive ? "text-cyan-300" : "text-white"
                                }`
                            }
                        >
                            <FaListAlt size={20} />
                            {isMenuTextVisible && <span>Exames</span>}
                        </NavLink>

                    </li>
                    <li>
                        <NavLink
                            to="/exames-list"
                            onClick={handleLinkClick}
                            className={({ isActive }) =>
                                `flex gap-2 hover:text-cyan-300 ${isActive ? "text-cyan-300" : "text-white"
                                }`
                            }
                        >
                            <FaListAlt size={20} />
                            {isMenuTextVisible && <span>Lista Exames</span>}
                        </NavLink>

                    </li>
                </ul>
            </nav>

            {/* botao sair */}
            <div className='p-4 border-t border-cyan-700 dark:border-cyan-900'>
                <button
                    onClick={handleLogout}
                    className='flex items-center gap-3 text-red-300 hover:text-red-500 w-full cursor-pointer'
                >
                    <MdExitToApp size={20} />
                    {isMenuTextVisible && <span>Sair</span>}

                </button>
            </div>

        </aside >
    )
}

export default SideMenu
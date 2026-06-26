import React from 'react'
import { Outlet } from 'react-router'
import NavBar from '../../components/NavBar'

const Main = () => {
  return (
    <div className='flex flex-col h-screen  '>
        <header className='' >
        <NavBar/>
        </header>
        <main >

            <Outlet/>

        </main>


        <footer>

        </footer>



    </div>
  )
}

export default Main
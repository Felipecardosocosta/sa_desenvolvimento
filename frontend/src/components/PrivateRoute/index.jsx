import React from 'react'

import {Navigate}from "react-router"
import {useAuth} from "../../contexts/AuthContext"

const PrivateRouter = ({children}) => {

    const {user} = useAuth()


    if (!user) {
        return <Navigate to={"/"} replace/>
    }

  return (
    children
  )
}

export default PrivateRouter
import React from 'react'
import * as ReactRouterDOM from 'react-router-dom'
import { useAuth } from '../Context/authContext'

type AuthProps = {
    children: React.ReactElement
}

const RequireAuthComponent : React.FC<AuthProps> = ({children}) => {
    const {currentUser} = useAuth()
    return (
        currentUser ? children : <ReactRouterDOM.Navigate to={"/"}/>
    )
}

export default RequireAuthComponent
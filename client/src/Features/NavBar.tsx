import React from 'react'
import { CONSTANTS } from '../Constants/constants'
import * as ReactRouterDOM from 'react-router-dom'
import { useAuth } from '../Context/authContext'

const NavBar = () => {
    const {currentUser, logout} = useAuth()
    const navigate = ReactRouterDOM.useNavigate()
    const handleLogout = async () => {
        try {
            await logout()
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <div className='bg-red-500 font-semibold text-white p-3 text-center md:flex md:justify-between '>
                <div>
                <h1>{CONSTANTS.BLOG_WEBSITE.toUpperCase()}</h1>
                </div>
                <div>
                    <ul className='md:flex gap-4 font-semibold'>
                        <li>
                            <ReactRouterDOM.Link to={currentUser ? `/${currentUser.uid}/create` : `/`} >
                            {CONSTANTS.CREATE.toUpperCase()}
                            </ReactRouterDOM.Link>
                        </li>
                        <li>
                            <ReactRouterDOM.Link to={currentUser ? `/${currentUser.uid}` : `/`} >
                            {CONSTANTS.BLOGS.toUpperCase()}
                            </ReactRouterDOM.Link>
                        </li>
                        <li>
                            {currentUser ? <ReactRouterDOM.Link onClick={handleLogout} to={`/`} >
                            {CONSTANTS.LOGOUT.toUpperCase()}
                            </ReactRouterDOM.Link>  : <ReactRouterDOM.Link to={`/`} >
                            {CONSTANTS.LOGIN.toUpperCase()}
                            </ReactRouterDOM.Link>}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default NavBar
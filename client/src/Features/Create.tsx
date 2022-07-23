import React, { useEffect } from 'react'
import ButtonComponent from '../Components/buttonComponent'
import DropDownComponent from '../Components/dropDownComponent'
import InputComponent from '../Components/InputComponent'
import { CONSTANTS } from '../Constants/constants'
import { useAuth } from '../Context/authContext'
import { uid } from 'uid';
import { createBlog, editBlog } from '../Redux/blog-slice'
import * as ReactRouterDOM from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../Redux'
import { BlogInterface } from '../../../server/Interface/blogInterface'
import { useLocation } from 'react-router-dom'

type RegisterInterface = {
    title: string,
    description: string
}

const Create : React.FC = () => {
    const location = useLocation()
    const state = location.state as BlogInterface
    const dispatch = useDispatch<AppDispatch>()
    const navigate = ReactRouterDOM.useNavigate()
    const [authFail, setAuthFail] = React.useState('')
    const [register, setRegister] = React.useState<RegisterInterface>({
        title: '',
        description: '',
    })
    const [dropDownKind, setDropDownKind] = React.useState('')
    const {currentUser} = useAuth()
    useEffect(() => {
        const checkCurrent = () => {
            if(state){
                setRegister((data: RegisterInterface) => {
                    return ({
                        title : state.title,
                        description : state.description
                    })
                })
                setDropDownKind(state.kind)
            }
        }
        checkCurrent()
    }, [])
    const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setRegister({
            ...register, [e.target.name] : e.target.value
        })
    }
    const handleCreateBlog = async () => {
        if(register.title === '' || register.description === '' || dropDownKind === '') setAuthFail('Please fill in all data')
        else{
            if(state){
                await dispatch(editBlog({title: register.title, description: register.description, kind: dropDownKind, uid: state.uid, user: state.user}))
                navigate(`/${currentUser.uid}`)
            }
            else{
                await dispatch(createBlog({uid: uid(25), title: register.title, description: register.description, kind: dropDownKind, user: currentUser.uid}))
                navigate(`/${currentUser.uid}`)
            }

        }
    }
    const handleDropDownKind = async (e: React.ChangeEvent<HTMLSelectElement>) => {        
        setDropDownKind(e.target.value)
    }
    return (
        <div>
            <div className='h-96 items-center flex'>
            <div className='bg-red-500 font-semibold w-96 h-72 mx-auto rounded-md'>
                <div className='p-3'>
                {authFail && <h1 className='text-center font-semibold text-2xl'>{authFail}</h1>}
                <h1 className='text-center text-white'>{CONSTANTS.CREATE_BLOG.toUpperCase()}</h1>
                <div className='flex items-center justify-center'>
                    <div className='space-y-2'>
                    <InputComponent onChange={handleInputChange} inputProps={{name: CONSTANTS.TITLE, placeholder: CONSTANTS.TITLE, type: CONSTANTS.TEXT, value: register.title}}/>
                    <InputComponent onChange={handleInputChange} inputProps={{name: CONSTANTS.DESCRIPTION, placeholder: CONSTANTS.DESCRIPTION, type: CONSTANTS.TEXT, value: register.description}}/>
                    <DropDownComponent onChange={handleDropDownKind} inputProps={{data: ['Select one', 'travel', 'food', 'attractions', 'beauty']}}/>
                    {state ? <ButtonComponent onClick={handleCreateBlog}>{CONSTANTS.UPDATE.toUpperCase()}</ButtonComponent> : <ButtonComponent onClick={handleCreateBlog}>{CONSTANTS.CREATE.toUpperCase()}</ButtonComponent>}
                    </div>
                </div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Create

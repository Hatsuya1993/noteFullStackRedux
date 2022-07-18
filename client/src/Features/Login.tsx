import React from 'react'
import * as ReactRouterDOM from 'react-router-dom'
import ButtonComponent from '../Components/buttonComponent'
import InputComponent from '../Components/InputComponent'
import { CONSTANTS } from '../Constants/constants'
import { useAuth } from '../Context/authContext'

type InputFieldsType = {
    name: string,
    password: string
}

const Login = () => {
    const navigate = ReactRouterDOM.useNavigate()
    const [inputFields, setInputFields] = React.useState<InputFieldsType>({name: '', password: ''})
    const [authFail, setAuthFail] = React.useState('')
    const {login} = useAuth()

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputFields({
            ...inputFields, [e.target.name] : e.target.value
        })
    }

    const handleLogin = async () => {
        try {
            const loginData = await login(inputFields.name, inputFields.password)
            navigate(`/${loginData.user.uid}`)
        } catch (error) {
            setAuthFail(CONSTANTS.EMAIL_AND_PASSWORD_IS_INCORRECT)
            console.log(error)
        }
    }

    return (
        <div className='h-96 items-center flex'>
            <div className='bg-red-500 font-semibold w-80 mx-auto h-72 rounded-md'>
                <div className='p-3'>
                {authFail && <h1>{authFail}</h1>}
                <h1 className='text-center text-white'>{CONSTANTS.LOGIN.toUpperCase()}</h1>
                <div className='flex items-center h-36 justify-center'>
                    <div className='space-y-2'>
                    <InputComponent onChange={handleInputChange} inputProps={{name: CONSTANTS.NAME, placeholder: CONSTANTS.NAME, type: CONSTANTS.EMAIL, value: inputFields.name}}/>
                    <InputComponent onChange={handleInputChange} inputProps={{name: CONSTANTS.PASSWORD, placeholder: CONSTANTS.PASSWORD, type: CONSTANTS.PASSWORD, value: inputFields.password}}/>
                    <ButtonComponent onClick={handleLogin}>{CONSTANTS.LOGIN.toUpperCase()}</ButtonComponent>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Login
import React from 'react'

type ButtonProps = {
    onClick: React.MouseEventHandler<HTMLButtonElement>,
    children: React.ReactNode
}

const ButtonComponent : React.FC<ButtonProps> = ({onClick, children}) => {
    return (
        <div>
            <button className='bg-blue-800 p-1 rounded-md text-white' onClick={onClick}>{children}</button>
        </div>
    )
}

export default ButtonComponent
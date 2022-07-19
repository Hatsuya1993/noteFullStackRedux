import React from 'react'

type NoticeProps = {
    message : String
}

const NoticeComponent : React.FC<NoticeProps> = ({message}) => {
    return (
        <div className='text-center bg-orange-400 w-52 p-3 rounded-md mx-auto my-5 text-2xl'>
            <h1 className='text-white text-center'>{message.toUpperCase()}</h1>
        </div>
    )
}

export default NoticeComponent
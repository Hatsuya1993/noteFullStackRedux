import React from 'react'

type InputProps = {
    inputProps : {type: React.HTMLInputTypeAttribute, placeholder: React.HTMLInputTypeAttribute, name: React.HTMLInputTypeAttribute, value: React.HTMLInputTypeAttribute},
    onChange: React.ChangeEventHandler<HTMLInputElement>
}

const InputComponent : React.FC<InputProps> = ({inputProps, onChange}) => {
    return (
        <div>
            <input className='p-2 rounded-md' {...inputProps} onChange={onChange}/>
        </div>
    )
}

export default InputComponent
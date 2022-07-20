import React from 'react'

type DropDownProps = {
  inputProps : {data: string[]},
  onChange: React.ChangeEventHandler<HTMLSelectElement>
}

const DropDownComponent : React.FC<DropDownProps> = ({inputProps, onChange}) => {
  return (
    <div>
      <select onChange={onChange} name="" id="">
        {inputProps.data.map((each: string) => {
          return (
            <option key={each} value={each}>{each}</option>
          )
        })}
      </select>
    </div>
  )
}

export default DropDownComponent
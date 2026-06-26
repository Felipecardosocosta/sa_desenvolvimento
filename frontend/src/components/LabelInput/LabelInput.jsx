import React from 'react'


export const LabelInput = ({ type,id, text, name,value,setValue, ...rest}) => {

     

    return (
        <fieldset className='flex flex-col gap-1'>
            <label
                htmlFor={id}
                className=''
            >{text}:
            </label>

            <input
                id={id}
                type={type}
                name={name}
                className='w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                value={value}
                onChange={(e)=>setValue(e.target.value)}
        
                {...rest}
             
                
               
             
            />


        </fieldset>
    )
}


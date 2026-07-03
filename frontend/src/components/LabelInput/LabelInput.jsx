import React from 'react'


export const LabelInput = ({ type,id, text, name,value,setValue, ...rest}) => {

     

    return (
        <fieldset className='flex flex-col gap-1'>
            <label
                htmlFor={id}
                className='text-gray-700 dark:text-slate-300 font-medium transition-colors'
            >{text}:
            </label>

            <input
                id={id}
                type={type}
                name={name}
                className='w-full p-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600 transition-colors'
                value={value}
                onChange={(e)=>setValue(e.target.value)}
        
                {...rest}
             
                
               
             
            />


        </fieldset>
    )
}


import React from 'react'

export const DropDown = (props) => {
    return (
        <select name={props.name} 
                {...props}
                onChange={ e => props.onChange(e) }>
            {
                props.options.map( op => (
                    <option key={op.key} value={op.value}>{op.label}</option>
                ))
            }
        </select>
    )
}


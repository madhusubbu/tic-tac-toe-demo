import React from 'react'

export const Box = (props) => {
return (
    <button className="box" onClick={props.onClick} >
        {props.value}
    </button>
)
    
}

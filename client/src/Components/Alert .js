import React from 'react'

const Alert  = (props) => {
    return (
        <div className="h-10">
            {props.alert && 
            <div className="flex items-start justify-start p-1.5 border-2 border-green-600 bg-green-100 text-green-800 rounded" role="alert">
                <strong>{props.alert.type}</strong>&nbsp;{props.alert.msg}           
            </div>}
        </div>
    )
}

export default Alert 

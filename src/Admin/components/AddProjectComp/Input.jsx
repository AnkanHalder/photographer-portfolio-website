import React from 'react'

function Input(props) {
  return (
    <div className="w-full h-full flex flex-wrap items-center gap-2 my-4">
        <label className=' font-extrabold' htmlFor={props.name} style={{width:"max-content"}}>{props.labelText}</label>
        {(props.input == "input")?
            <input 
                className="w-4/6 p-2 rounded-lg add-project__input"
                type="text" 
                id={props.name}
                name={props.name}
                value={props.value} 
                placeholder={props.placeholder}
                onChange={(e)=>props.onChange(e)}
                required/> 
            :
            <>
                <textarea 
                className=" w-11/12 h-40 p-2 rounded-lg add-project__input"
                type="text" 
                id={props.name}
                name={props.name} 
                placeholder={props.placeholder}
                value={props.value}
                onChange={(e)=>props.onChange(e)}
                required/>
            </>
        }
    </div>
  )
}

export default Input
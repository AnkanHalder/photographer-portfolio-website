"use client"
import { useState } from "react"

const Nav = () => {
    const [active,setActive] = useState(0)
  return (
    <div className='fixed top-0 left-0 h-20 w-full z-[60] text-md md:text-xl cursor-pointer font-sans bg-black
        flex flex-wrap items-center justify-center md:gap-16'>
        <a onClick={()=>{setActive(0)}} 
            className={"text-white hover:underline px-4 z-50 " + 
            ((active==0)?"bg-white text-pink-500 rounded-full font-bold":"")}>
            Home
        </a>
        <a onClick={()=>{setActive(1)}} 
            className={"text-white hover:underline py-2 px-4 z-50 " + 
            ((active==1)?"bg-white text-pink-500 rounded-full font-bold":"")}>
            Projects
        </a>
        <a onClick={()=>{setActive(2)}} 
            className={"text-white hover:underline py-2 px-4 z-50 " + 
            ((active==2)?"bg-white text-pink-500 rounded-full font-bold":"")}>
            Reviews
        </a>
        <a onClick={()=>{setActive(3)}} 
            className={"text-white hover:underline py-2 px-4 z-50 " + 
            ((active==3)?"bg-white text-pink-500 rounded-full font-bold":"")}>
            About Me
        </a>
        <a onClick={()=>{setActive(4)}} 
            className={"text-white hover:underline py-2 px-4 z-50 " + 
            ((active==4)?"bg-white text-pink-500 rounded-full font-bold":"")}>
            Contact Me
        </a>
    </div>
  )
}

export default Nav
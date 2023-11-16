"use client"
import React,{useState,useContext} from 'react'
import "@/client/styles/Nav.css"
import {AiOutlineMenu} from "react-icons/ai"
import { ProjectContext } from '@/contexts/ProjectContext'



const Nav = (props) => {
    const navTextColor = props.darkMode ? "text-white" : "text-black";
    const [navOn, setNavOn] = useState(false);
    const { projects } = useContext(ProjectContext);
    const [displayAlbums, setDisplayAlbums] = useState(false);
  
    return (
      <div className='fixed top-0 left-0 z-[100] bg-transparent'>
        <div className={'h-12 w-screen flex items-center justify-between bg-transparent px-4 md:px-8 z-[200] ' + ((navOn) ? (navTextColor) : (props.darkMode ? "text-black" : "text-white"))}>
          <h1 className='nav-logo z-[100]'>ANSHU</h1>
          <div className='nav-menu-button z-[100]' onClick={() => setNavOn((prev) => (!prev))}>
            <AiOutlineMenu />
          </div>
        </div>
        <div className={'absolute z-[90] top-0 right-0 nav-screen ' + ((props.darkMode) ? "bg-black text-white " : "bg-white text-black ") + ((navOn) ? "nav-screen-on" : "nav-screen-off")}>
          <div className='relative z-[100] m-8 h-full w-full flex items-center justify-center'>
            <div className='flex flex-col items-center justify-between h-8/12 w-full'>
              <a href="/" className='py-2 px-4 md:text-2xl my-2 hover:bg-black hover:text-white hover:scale-110 rounded-xl transition-all duration-300'>
                <h1 className="">Home</h1>
              </a>
              <a
                href="/anshu/albums"
                className='cursor-pointer py-2 px-4 md:text-2xl my-2 hover:bg-black hover:text-white hover:scale-110 rounded-xl transition-all duration-300'
              >
                <h1 className="">My Albums</h1>
              </a>
              <div
                className={`flex flex-col items-center justify-center text-center transition-all duration-200 overflow-hidden ${displayAlbums ? "" : "h-0"}`}
              >
                {projects && projects.map((project, i) => (
                  <h1
                    className='py-2 px-3 text-sm md:text-2xl my-2 hover:bg-black hover:text-white hover:scale-110 rounded-xl transition-all duration-300'
                    key={i}
                  >
                    {project.title}
                  </h1>
                ))}
              </div>
              <a href="/anshu/gallery" className='py-2 px-4 md:text-2xl my-2 hover:bg-black hover:text-white hover:scale-110 rounded-xl transition-all duration-300'>
                <h1 className="">Gallery</h1>
              </a>
              <a href="/anshu/reviews" className='py-2 px-4 md:text-2xl my-2 hover:bg-black hover:text-white hover:scale-110 rounded-xl transition-all duration-300'>
                <h1 className="">Reviews</h1>
              </a>
              <a href="/anshu/contact" className='py-2 px-4 md:text-2xl my-2 hover:bg-black hover:text-white hover:scale-110 rounded-xl transition-all duration-300'>
                <h1 className="">Contact Me</h1>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default Nav;
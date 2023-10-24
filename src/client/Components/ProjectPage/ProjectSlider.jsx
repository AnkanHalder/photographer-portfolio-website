"use client"
import Image from 'next/image'
import { useState } from 'react'
import Tilt from 'react-parallax-tilt';


const ProjectSlider = (props) => {
  const [imageLink, setImageLink] = useState({currImg:"/Images/fox.jpg"});
  return (
    <div className='project-slider overflox-x-hidden shadow-small'>
        <div className='img-prev overflox-x-hidden'>
          <div className='p-4 -translate-x-1/2 opacity-50'>
            <Image src={imageLink.currImg} width={1280} height={1080}/> 
          </div>
        </div>
        <Tilt className='img-curr overflox-x-hidden shadow-large'>
          <div className='relative'>
            <Image src={imageLink.currImg} width={1280} height={1080}/> 
          </div>
          <div className='project-info bottom-0 left-0 bg-black text-center w-full p-4 shadow-small'>
            <h1>This is project Heading</h1>
            <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            </p>
          </div>
        </Tilt>
        <div className='img-next overflox-x-hidden'>
          <div className='p-4 translate-x-1/2 opacity-50'>
            <Image src={imageLink.currImg} width={1280} height={1080}/> 
          </div>
        </div>
    </div>
  )
}

export default ProjectSlider
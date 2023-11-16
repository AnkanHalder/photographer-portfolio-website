import React from 'react'
import HomeCarouselPlane from '../Components/Home/HomeCarouselPlane'
import GalleryPage from './GalleryPage'

const HomePage = () => {
  return (
    <div className='h-screen w-screem overflow-x-hidden overflow-y-auto'>
        <HomeCarouselPlane/>
        <div className=' my-32'>
          <div className='flex flex-col items-center justify-center'>
            <div className='mb-24 w-1/2'>
              <hr className=' border-solid border-b-2 border-black' />
            </div>
            <h1 className='mb-16 text-center text-3xl md:text-6xl font-semibold'>
              <span className='text-red-500 font-bold'> Hi There! </span>
              I Am Anshu
            </h1>
            <div className='mx-4 md:mx-16 px-4 md:px-32 text-2xl md:text-3xl text-center'>
              Welcome to my world of captured moments, where every click of the shutter holds a piece of my heart. I'm so glad you're here to explore the memories, the laughter, and the love that I've had the privilege to witness through my lens.
            </div>
            <div className='mt-24 w-1/2'>
              <hr className=' border-solid border-b-2 border-black' />
            </div> 
          </div>
        </div>
        <GalleryPage darkMode={true} />
    </div>
  )
}

export default HomePage
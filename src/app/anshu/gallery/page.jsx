import React from 'react'
import Nav from '@/client/Pages/Nav'
import GalleryPage from '@/client/Pages/GalleryPage'

const page = () => {
  return (
    <div className='dark-secondary min-h-screen w-screen overflow-hidden p-4 '> 
      <Nav/>
      <div className='mt-10 mb-4 '>
        <GalleryPage />
      </div>
    </div>
    
  )
}

export default page
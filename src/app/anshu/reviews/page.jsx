import React from 'react'
import Nav from '@/client/Pages/Nav'
import ReviewPage from '@/client/Pages/ReviewPage'

const page = () => {
  return (
    <div>
      <Nav darkMode={true}/>
      <div className='min-h-screen w-screen bg-white pt-16 pb-8 px-4 md:px-8'>
        <ReviewPage/>
      </div>
    </div>
  )
}

export default page
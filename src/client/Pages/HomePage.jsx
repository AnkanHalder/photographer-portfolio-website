import React from 'react'
import Plane from '../Components/Home/Plane'

function HomePage() {
  return (
    <div class="min-h-screen w-screen bg-black">
        <div className='h-full w-full'>
            <Plane planeNumber={"1"} images={["/Images/fantasy.jpg","/Images/mountain.jpg","/Images/fox.jpg"]} />
            <Plane planeNumber={"2"} images={["/Images/fantasy.jpg","/Images/mountain.jpg","/Images/fox.jpg"]} />
            <Plane planeNumber={"3"} images={["/Images/fantasy.jpg","/Images/mountain.jpg","/Images/fox.jpg"]} />
        </div>
       
    </div>
  )
}

export default HomePage
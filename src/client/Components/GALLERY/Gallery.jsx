"use client"
import React, { useState } from 'react'
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import "@/client/styles/Gallery.css"

const Gallery = ({imageArray}) => {
  const [displayImage,setDisplayImage] = useState(null);
  console.log(imageArray)
  return (
    <div className=''>
        <ResponsiveMasonry
                  columnsCountBreakPoints={{350: 1, 750: 3, 900: 5}}
              >
                  <Masonry>
                  {imageArray.map((image,key)=>
                  <div key={key} 
                      onClick={()=>setDisplayImage(image)}
                      className={'imagediv relative m-2 shadow-large hover:scale-[1.02] \
                       flex items-center justify-center bg-transparent \
                        transition-transform duration-200 ' + ((displayImage)?" blur-lg": "") }>
                    <img 
                        src={image.imageSrc}
                        alt={image.title}
                        className='imagediv-image p-0 m-0 '
                        loading='lazy'
                        width={"300px"}
                    />
                    <div className='imagediv-overlay absolute top-0 left-0 h-full w-full flex items-center justify-center text-white z-[50]'>
                      <h1 className='imagediv-overlay-icon'>
                        View
                      </h1>
                    </div>
                  </div>)}
                  </Masonry>
        </ResponsiveMasonry>
        {
          (displayImage)?
          <div className='fixed top-0 left-0 h-screen w-screen z-[2000] flex items-center justify-center'>
            
            <div className='flex items-center justify-center relative' style={{maxWidth: "80vw",height:"80vh"}}>
              <img src={displayImage.imageSrc} alt={displayImage.title} style={{ maxWidth: '100%', maxHeight: '100%' }}/>
              <div className='absolute top-0 right-0 z-[1000] bg-red-500 rounded-full p-4 text-white shadow-large cursor-pointer' onClick={()=>setDisplayImage(null)}>
                X
              </div>
            </div>
          </div>
          :
          null
        }
    </div>
  )
}

export default Gallery
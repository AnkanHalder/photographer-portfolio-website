"use client"
import {useEffect,useState} from 'react'
import { ApiCaller } from '@/ApiManager/apiCaller';
import Gallery from '../Components/GALLERY/Gallery';

const GalleryPage = (props) => {
    const [images,setImages] = useState([]);
    useEffect(()=>{
        ApiCaller.getGalleryImages().then((imageResponse)=>setImages(imageResponse));
    },[])
  return (
    <div className={((props.darkMode)?" text-black": " text-white")}>
      <h1 className='text-center text-4xl md:text-6xl'>Featured Work</h1> 
      <p className='my-8 text-justify md:text-center text-xl px-6 md:px-32'>
        "Photography is the only language that can be understood anywhere in the world. Photography is the art of frozen time. The ability to store emotion and feelings within a frame, to reveal the beauty of our world, and the stories that can't be told with words. It is a never-ending journey to capture the extraordinary in the ordinary, to freeze a moment that speaks volumes, and to connect with the hearts and souls of those who view it. Welcome to our world of captured memories and unspoken stories."
      </p>
      <Gallery imageArray={images} />
    </div>
  )
}

export default GalleryPage
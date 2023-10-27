"use client"
import Image from "next/image";
import { useEffect,useState } from "react";

const imageArr = [
  "/Images/fantasy.jpg",
  "/Images/fox.jpg",
  "/Images/mountain.jpg"
];

const HomeCarouselPlane = () => {
  const [curr,setCurr] = useState(0);
  
  useEffect(() =>{
    const interval = setInterval(()=>{
      setCurr((prev)=>(
        prev==imageArr.length-1?0:(prev+1)
      ));
    },3000);
    return ()=>{
      clearInterval(interval);
    }
  },[]);

  return (
    <div className="relative h-1/2 md:h-full w-screen overflow-hidden flex">
      {imageArr.map((img, i) => (
          <img 
            key={i} 
            src={img} 
            alt={`Image ${i}`} 
            style={{ 
              transform: `translateX(-${curr*100}%)`  
            }} 
            className=" object-cover object-center transition-transform ease-out duration-1000"/>
      ))}
    </div>
  );
};

export default HomeCarouselPlane;

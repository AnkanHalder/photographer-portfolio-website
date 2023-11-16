"use client"
import Image from "next/image";
import { useEffect,useState } from "react";

const imageArr = [
  "/HomeImages/1.jpg",
  "/HomeImages/2.jpg",
  "/HomeImages/3.jpg",
  "/HomeImages/4.jpg",
  "/HomeImages/5.jpg",
  "/HomeImages/6.jpg"
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
    <div className="h-1/2 md:h-screen w-screen overflow-hidden flex">
      {
        imageArr.map((image,i)=>
          <div className="relative bg-yellow-500 w-full h-full transition-transform duration-1000" style={{
              minWidth: "100vw", 
              transform: `translateX(-${curr*100}%)`  
            }} >
            <Image src={image} layout="fill" objectFit="cover" objectPosition="center"/>
          </div>
        )
      }
      
    </div>
  );
};

export default HomeCarouselPlane;

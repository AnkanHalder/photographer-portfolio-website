import React from 'react'
import "@/client/styles/circle_img_style.css"


const CircleAnimation = () => {
  const numImages = 5;
  const images = [];

  // Generate positions for each image around the circle
  for (let i = 0; i < numImages; i++) {
    const angle = (i * (360 / numImages)).toFixed(2); // Calculate the angle for each image
    const imageStyle = {
      transform: `rotate(${angle}deg) translate(200px) rotate(-${angle}deg)`, // Position the image around the circle
    };
    images.push(
      <div key={i} className="image" style={imageStyle}>
        <img src="/Images/fox.jpg" width={"100px"}/>
      </div>
    );
  }

  return (
    <div className="circle-container">
      <div className="circle">{images}</div>
    </div>
  );
};

export default CircleAnimation;

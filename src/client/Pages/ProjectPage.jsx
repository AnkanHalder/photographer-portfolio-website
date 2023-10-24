import React from 'react';
import Image from 'next/image';
import ProjectSlider from '../Components/ProjectPage/ProjectSlider';
import "@/client/styles/Projects/ProjectSlider.css"

const ProjectPage = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-black overflow-x-hidden">
      <div className="h-screen w-screen fixed overflow-hidden top-0 left-0 grayscale opacity-30">
        <Image
          src="/Images/fox.jpg"
          alt="FOX LANDSCAPE"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="h-full w-full z-50 flex items-center justify-center text-white">
        <ProjectSlider />
      </div>
    </div>
  );
};

export default ProjectPage;

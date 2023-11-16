"use client"
import React,{useContext} from 'react'
import { ProjectContext } from '@/contexts/ProjectContext'
import "@/Admin/styles/manageproject.css"

const ManageProject = () => {
  const projects = useContext(ProjectContext);
  console.log(projects);
  if (!projects){
    return null;
  }
  return (
    <div>
        <div className='mb-4 mt-6 text-center'>
            <h1 className="text-4xl font-sans font-extrabold">Projects</h1>
        </div>
        <div className='flex flex-col items-center justify-center gap-6'>
        {
          projects.map((project,key) =>(
              <div key={key} className='projectbox w-11/12 p-4 md:p-8 shadow-md rounded-xl'>
                <h1 className='font-bold mb-4'>{project.title}</h1>
                <p>{project.description}</p>
              </div>
            
          ))
        }
        </div>
    </div>
  )
}

export default ManageProject
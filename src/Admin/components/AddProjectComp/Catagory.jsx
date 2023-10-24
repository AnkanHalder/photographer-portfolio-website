"use client"
import Input from "./Input"
import DropMedia from "./DropMedia";
import { useState } from "react";

function Catagory(props) {

    const [uploadMedia,setUploadMedia] = useState(false);


    return (
        <>  
          <Input 
            labelText="Catagory Name" 
            name={"catagoryName"} 
            input={"input"} placeholder={props.value}
            required
            value={props.value}
            onChange={(e) => {props.handleNameChange(e.target.value)}}
          />
          <div className="popup-generator " style={{display: (uploadMedia)?"block":"none"}}>
            <DropMedia  imageUpload={props.handleImageUpload}
              uploadMedia={uploadMedia} setUploadMedia={setUploadMedia}
            />
          </div>
          <div className="image-container" style={{ columnWidth: "300px"}}>
            <div>
                {
                  props.catagories[props.index].imageUrls.map((file, index) => (
                    <div key={index} className="pic border-dashed my-2 relative">
                      <img src={URL.createObjectURL(file)} alt={file.name} className="relative" />
                      <button 
                        className="p-4 bg-red-500 absolute top-0 right-2 rounded-full z-10 text-white"
                        onClick={()=>{
                          const updatedFiles = [...props.catagories[props.index].imageUrls];
                          updatedFiles.splice(index, 1); 
                          props.setCatagories((prev)=>{
                            const updatedCategories=[...prev];
                            updatedCategories[props.index].imageUrls = updatedFiles;
                            return updatedCategories; 
                          });
                        }}>
                        X
                      </button>
                    </div>
                  ))
                }
            </div>
          </div>
          <div className='flex flex-col md:flex-row items-center gap-4'>
            <button onClick={()=>setUploadMedia(true)} className="p-2 text-xl bg-black text-white rounded-xl">
              Add Media
            </button>
            <button onClick={()=>{props.handleRemoveCategory()}} className="p-2 text-xl bg-black text-white rounded-xl">
              Remove Catagory
            </button>   
          </div>
        </>
        
  )
}

export default Catagory
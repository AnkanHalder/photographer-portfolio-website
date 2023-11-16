"use client"
import React,{useState,useCallback} from 'react'
import Input from './AddProjectComp/Input'
import "@/Admin/styles/addProject.css"
import Catagory from './AddProjectComp/Catagory'
import { ApiCaller } from '@/ApiManager/apiCaller'
import { useDropzone } from 'react-dropzone'

const defaultProject = {
    projectName: "",
    thumbnail: "",
    projectDescription: "",
    catagories: []
}

function AddProjectPage(props) {
    const [title,setTitle] = useState(defaultProject.projectName);
    const [description,setDescription] = useState(defaultProject.projectDescription);
    const [thumbnail,setThumbnail] = useState(defaultProject.thumbnail);
    const [catagories,setCatagories] = useState(defaultProject.catagories);
    const [thumbnailURL,setThumbnailURL] = useState("");

    const onDrop = useCallback(async(acceptedFiles)=>{
      if(acceptedFiles.length){
        Object.assign(acceptedFiles[0], {preview: URL.createObjectURL(acceptedFiles[0])})
        setThumbnail(acceptedFiles[0]);
      }
    },[]);

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

    const updateCategoryName = (index,value) => {
        setCatagories((prev)=>{
            const updated_catagories = [...prev];
            updated_catagories[index].name = value;
            return updated_catagories;
        });
    }
    const updateCategoryImage = (index, images) => {
        setCatagories((prev) => {
          const updatedCategories = [...prev];
          updatedCategories[index].imageUrls = [...images];
          return updatedCategories;
        });
    };
      
    const removeCategory = (index) => {
        setCatagories((prev)=>{
            const updated_catagories = [...prev];
            updated_catagories.splice(index, 1);
            return updated_catagories;
        });
    }

    const handleSubmit = async () => {
        // add thumbnail
        const imageFormData = new FormData();
        imageFormData.append("file", thumbnail);
        imageFormData.append(
            "upload_preset",
            process.env.NEXT_PUBLIC_UPLOAD_PRESET
        );
        imageFormData.append("folder", title);
      
        // Generates cloudinary URL
        const imageUploadResponse = await ApiCaller.uploadToCloudinary(imageFormData);
        if (imageUploadResponse.success) {
                    // Assigns Cloudinary URLs to respective categories
            setThumbnailURL(imageUploadResponse.data.secure_url);
        } else {
              console.error("Error uploading image:", imageUploadResponse);
        }


        const imageArr = {}; // Initialize an empty object
      
        try {
          await Promise.all(
            catagories.map(async (cat) => {
              const uploadedImages = cat.imageUrls;
              console.log(uploadedImages);
              // Initialize imageArr[cat.name] as an empty array
              imageArr[cat.name] = [];
      
              await Promise.all(
                uploadedImages.map(async (file) => {
                  console.log(file);
                  const imageFormData = new FormData();
                  imageFormData.append("file", file);
                  imageFormData.append(
                    "upload_preset",
                    process.env.NEXT_PUBLIC_UPLOAD_PRESET
                  );
                  imageFormData.append("folder", title);
      
                  // Generates cloudinary URL
                  const imageUploadResponse = await ApiCaller.uploadToCloudinary(imageFormData);
                  console.log(imageUploadResponse);
                  if (imageUploadResponse.success) {
                    // Assigns Cloudinary URLs to respective categories
                    const imgData = imageUploadResponse.data;
                    const imageURL = imgData.secure_url; // Cloudinary URL
                    console.log(imageURL);
                    imageArr[cat.name].push(imageURL);
                    console.log("new Image Arr is ",imageArr,"\n");
                  } else {
                    console.log("Error uploading image:", imageUploadResponse);
                  }
                })
              );
            })
          );
        } catch (error) {
          console.error("Error uploading images:", error);
        }
       console.log(imageArr,thumbnailURL);
        const data = await ApiCaller.addProject({
          title: title,
          description: description,
          thumbnail: thumbnailURL,
          categories: catagories.map((cat) => {
            return {
              name: cat.name,
              imageUrls: imageArr[cat.name],
            };
          }),
        });
    };
      
    return (
        <div>
            <div className='mb-4 mt-6 text-center'>
                <h1 className="text-4xl font-sans font-extrabold">Add Project</h1>
            </div>
            <div className='my-10 flex flex-col items-center justify-center'>
            <div className='my-8 flex items-center justify-center'>
                <div {...getRootProps()}>
                    <input {...getInputProps({})} />
                    <p className="px-8 py-4 bg-blue-500 hover:bg-blue-400 text-white">
                      Upload Project Thumbnail
                    </p>
                </div>  
            </div>
              <img width={"300px"} alt="project thumbnail " src={thumbnail.preview} />
            </div>
            <Input labelText="Project Name" 
                name={"project-name"} 
                input={"input"} placeholder={"Enter Project Name"}
                value={title}
                onChange={(e)=>{setTitle(e.target.value)}}/>

            <Input 
                labelText="Project Description" 
                name={"project-description"} 
                value={description}
                onChange={(e)=>{setDescription(e.target.value)}}
                input={"textarea"} placeholder={"Enter Project Description"}/>
            {catagories.map((cat, i) => (
                    <Catagory
                        edit={props.edit}
                        index={i}
                        catagories={catagories}
                        key={i}
                        value={cat.name}
                        setCatagories={setCatagories}
                        handleNameChange={(value)=>{updateCategoryName(i,value)}}
                        handleImageUpload={(images)=>{updateCategoryImage(i,images)}}
                        handleRemoveCategory={()=>{removeCategory(i)}}
                    />
            ))}
            <div className='w-full flex items-center justify-center my-16 '>
                <button className='p-4 bg-black text-white font-sans my-6 rounded-xl hover:scale-105' 
                    onClick={()=>{
                        setCatagories((prev)=>([...prev,{name:"",imageUrls:[]}]));
                    }}>
                    Add Catagory
                </button>
            </div>
            <div className='w-full flex items-center justify-center hover:scale-105'>
                <button className='p-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-sans my-6 rounded-xl shadow-lg hover:bg-gradient-to-r hover:from-yellow-400 hover:to-orange-600 focus:outline-none'
                        onClick={(e) => {
                            e.preventDefault();
                            handleSubmit();
                        }}>
                    PUBLISH CHANGES
                </button>
            </div>


        </div>
    )
}

export default AddProjectPage
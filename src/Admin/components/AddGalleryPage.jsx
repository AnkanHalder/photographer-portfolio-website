"use client"
import React, { useCallback,useState,useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { ApiCaller } from '@/ApiManager/apiCaller'
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"

const AddGalleryPage = () => {
  const [images,setImages] = useState([]);
  const onDrop = useCallback(async(acceptedFiles)=>{
    const uploadedFiles = [];
    if(acceptedFiles.length){
      await Promise.all(acceptedFiles.map(async(file) =>{
        console.log(file);
        const imageFormData = new FormData();
        imageFormData.append("file", file);
        imageFormData.append(
                    "upload_preset",
                    process.env.NEXT_PUBLIC_UPLOAD_PRESET
        );
        const imageUploadResponse = await ApiCaller.uploadToCloudinary(imageFormData);
        console.log(imageUploadResponse);
        const savedIamges = await ApiCaller.postGalleryImages({
          title: imageUploadResponse.original_filename,
          imageSrc: imageUploadResponse.secure_url,
          public_id: imageUploadResponse.public_id
        })
        console.log(savedIamges);
        uploadedFiles.push(savedIamges);
      }))
      setImages((prev)=>[...prev,...uploadedFiles]);
      console.log(uploadedFiles,images);
    }
  },[])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

  useEffect(()=>{
    ApiCaller.getGalleryImages().then((imageRes)=>{
      setImages(imageRes);
    });
  },[])

  return (
    <div>
      <div className='mb-4 mt-6 text-center'>
                <h1 className="text-4xl font-sans font-extrabold">Add Gallery Images</h1>
      </div>
      <div className='my-8 flex items-center justify-center'>
        <div {...getRootProps()}>
                    <input {...getInputProps({})} />
                    <p className="px-8 py-4 bg-blue-500 hover:bg-blue-400 text-white">
                      Upload Media
                    </p>
        </div>
      </div>
      <ResponsiveMasonry
                  columnsCountBreakPoints={{350: 1, 750: 2, 900: 5}}
              >
                  <Masonry>
                  {images.map((image,key)=>
                  <div key={key} className='m-2 shadow-2xl md:shadow-none relative'>
                    <img 
                        src={image.imageSrc}
                        alt={image.title}
                        className='p-0 m-0'
                        loading='lazy'
                        width={"300px"}
                    />
                    <div 
                      className='absolute top-0 right-0 p-3 bg-red-500 cursor-pointer text-white z-[50] rounded-bl-full'
                      onClick={async()=>{
                        setImages((prev)=> prev.filter((img)=> img._id != image._id))
                        const data = await ApiCaller.deleteImageFromDatabase({public_id:image.public_id, id:image._id});
                        console.log(data);
                      }}
                      >
                      X
                    </div>
                  </div>)}
                  </Masonry>
      </ResponsiveMasonry>
    </div>
  )
}

export default AddGalleryPage
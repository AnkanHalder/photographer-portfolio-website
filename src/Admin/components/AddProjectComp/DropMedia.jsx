"use client"
import React,{useCallback} from 'react'
import {useDropzone} from 'react-dropzone'

function DropMedia(props) {
    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            props.imageUpload(acceptedFiles);
        }
        props.setUploadMedia(false);
    }, []);

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

    return (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
            <div className='admin-pop-up p-4 bg-slate-100'>
                <div className="flex justify-between items-center mb-8 w-8/12 overflow-y-auto">
                    <h1>Upload Media</h1>
                    <button className="" onClick={()=>props.setUploadMedia(false)}>Close</button>
                </div>
                <div className=" bg-white p-4 grid justify-items-center items-center overflow-y-auto">
                    <div {...getRootProps()}>
                        
                        <input {...getInputProps({
                            className:" p-24 rounded-xl"
                        })} />
                            <p className='text-2xl text-center my-4'>Drag & Drop</p>
                            {   
                                isDragActive ?
                                <p>Drop the files here ...</p> :
                                <p>Drag 'n' drop some files here, or click to select files</p>
                            }
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default DropMedia
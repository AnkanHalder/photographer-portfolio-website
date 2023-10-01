"use client";
import React, { useState } from "react";
import RouteCheck from "@/components/RouteCheck";
import { useDropzone } from "react-dropzone";

import { faCloudUploadAlt, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function AddProject() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [uploadedImages, setUploadedImages] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png, image/gif, image/jpg",
    onDrop: (acceptedFiles) => {
      setUploadedImages([...uploadedImages, ...acceptedFiles]);
    },
  });

  async function handleImageDrop(categoryIndex) {
    //generates cloudinary links of images dropped and assigns them to their categories
    //console.log(categoryIndex);
    const updatedCategories = [...categories];

    setLoadingCategories((prevLoadingCategories) => {
      const updatedLoadingCategories = [...prevLoadingCategories];
      updatedLoadingCategories[categoryIndex] = true;
      return updatedLoadingCategories;
    });
    try {
      await Promise.all(
        uploadedImages.map(async (file) => {
          const imageFormData = new FormData();
          imageFormData.append("file", file);
          imageFormData.append(
            "upload_preset",
            process.env.NEXT_PUBLIC_UPLOAD_PRESET
          );
          //generates cloudinary url
          const imageUploadResponse = await fetch(
            NEXT_PUBLIC_IMAGE_FETCH_LINK,
            {
              method: "POST",
              body: imageFormData,
            }
          );
          if (imageUploadResponse.ok) {
            //assigns cloudinary urls to respective categories
            const imgData = await imageUploadResponse.json();
            const imageURL = imgData.secure_url; //cloudinary url
            console.log(imageURL);
            updatedCategories[categoryIndex].imageUrls.push(imageURL);
          } else {
            console.error("Error uploading image:", imageUploadResponse);
          }
        })
      );
      setUploadedImages([]);
      setCategories(updatedCategories);
      setLoadingCategories((prevLoadingCategories) => {
        const updatedLoadingCategories = [...prevLoadingCategories];
        updatedLoadingCategories[categoryIndex] = false;
        return updatedLoadingCategories;
      });
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  }

  function handleAddCategory() {
    if (categoryName.trim() === "") {
      return;
    }
    const newCategory = { name: categoryName, imageUrls: [] };
    const updatedCategories = [...categories, newCategory];
    setCategories(updatedCategories);
    setCategoryName(""); // Clear the category name after adding
  }

  async function handleSubmitForm(e) {
    e.preventDefault();
    const formData = {
      title,
      description,
      categories,
    };

    try {
      const response = await fetch("http://localhost:3000/api", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const projectData = await response.json();
        console.log(projectData);
        setTitle("");
        setDescription("");
        setCategories([]);
        setAlertMessage("");
        alert("Project has been successfully added");
      } else if (response.status === 400) {
        const errorMessage = await response.json();
        setAlertMessage(errorMessage.message);
      } else {
        console.error("Error adding project");
      }
    } catch (error) {
      console.error("Error adding project", error);
    }
  }

  return (
    <RouteCheck>
      <div className="container mx-auto p-4">
        <h1 className="text-xl font-bold mb-4">Add New Project</h1>
        {alertMessage && <p className="text-red-500">{alertMessage}</p>}
        <form onSubmit={handleSubmitForm} className="space-y-4">
          <div>
            <label htmlFor="name" className="font-bold">
              Project Name
            </label>
            <input
              type="text"
              id="title"
              placeholder="Project Name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="font-bold">
              Description
            </label>
            <textarea
              id="description"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
              required
            ></textarea>
          </div>
          <div>
            {categories.map((category, index) => (
              <div key={index}>
                <label className="font-bold">
                  Images for Category: {category.name}
                </label>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <FontAwesomeIcon icon={faCloudUploadAlt} />
                  <p>Drag and Drop/Click to select images</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleImageDrop(index)}
                  disabled={loadingCategories[index]}
                  className="bg-blue-500 text-white rounded-md px-2 py-1 hover:bg-blue-600"
                >
                  {loadingCategories[index] ? "Adding Images..." : "Add Images"}
                </button>
              </div>
            ))}
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Category Name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
            />
            <button
              type="button"
              onClick={handleAddCategory}
              className="bg-blue-500 text-white rounded-md px-2 py-1 hover:bg-blue-600"
            >
              <FontAwesomeIcon icon={faPlus} />
              Add Category
            </button>
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600"
            >
              Add Project
            </button>
          </div>
        </form>
      </div>
    </RouteCheck>
  );
}

export default AddProject;

"use client";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";
import { useDropzone } from "react-dropzone";
import {
  handleAddCategory,
  handleDeleteCategory,
  handleUpdateCategory,
  handleAddImage,
  handleDeleteImage,
  handleTitleChange,
  handleDescriptionChange,
  handleSubmit,
  fetchProject,
} from "@/projectFunctionalities/manageProject";
import RouteCheck from "@/components/RouteCheck";
import { useParams } from "next/navigation";

export default function EditPage() {
  const { projectId } = useParams();
  const [editedProject, setEditedProject] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [uploadedImages, setUploadedImages] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState([]);
  useEffect(() => {
    // Fetch the project data when the component mounts
    async function fetchProjectData() {
      const projectData = await fetchProject(projectId);
      setEditedProject(projectData);
    }
    fetchProjectData();
  }, [projectId]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png, image/gif, image/jpg",
    onDrop: (acceptedFiles) => {
      setUploadedImages([...uploadedImages, ...acceptedFiles]);
    },
  });

  async function handleSubmitProject(e) {
    e.preventDefault();
    await handleSubmit(editedProject);
  }
  if (!editedProject) {
    return <div>Loading...</div>;
  }

  return (
    <RouteCheck>
      <h1 className="text-3xl font-semibold mb-4">Edit Project</h1>
      <form onSubmit={handleSubmitProject} className="space-y-4">
        {/* Project Name */}
        <div>
          <label htmlFor="title" className="font-bold">
            Change Project Title
          </label>
          <input
            type="text"
            id="title"
            placeholder="Project Title"
            value={editedProject.title}
            onChange={(e) =>
              setEditedProject(handleTitleChange(editedProject, e.target.value))
            }
            className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Project Description */}
        <div>
          <label htmlFor="description" className="font-bold">
            Change Project Description
          </label>
          <textarea
            id="description"
            placeholder="Description"
            value={editedProject.description}
            onChange={(e) =>
              setEditedProject(
                handleDescriptionChange(editedProject, e.target.value)
              )
            }
            className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
          ></textarea>
        </div>
        {/* Categories */}
        {editedProject.categories &&
          editedProject.categories.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <h2 className="text-2xl font-semibold">
                Category: {category.name}
              </h2>
              {/* Update Category Name */}
              <div className="flex space-x-2 mt-2">
                <label htmlFor="categoryName" className="font-bold">
                  Change Category Name
                </label>
                <input
                  type="text"
                  placeholder="New Category Name"
                  value={category.name || ""}
                  onChange={(e) =>
                    setEditedProject(
                      handleUpdateCategory(
                        editedProject,
                        categoryIndex,
                        e.target.value
                      )
                    )
                  }
                  className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Images for the category */}
              <div className="flex flex-wrap mt-4">
                {category.imageUrls.map((imageUrl, imageIndex) => (
                  <div key={imageIndex} className="relative m-2">
                    {/* Delete Image Button */}
                    <button
                      type="button"
                      onClick={() =>
                        setEditedProject(
                          handleDeleteImage(
                            editedProject,
                            categoryIndex,
                            imageIndex
                          )
                        )
                      }
                      className="absolute top-0 right-0 text-red-500 bg-white p-1 hover:bg-red-100"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                    {/* Image */}
                    <div
                      className="w-32 h-32 border border-gray-300 rounded-lg bg-cover bg-center"
                      style={{ backgroundImage: `url(${imageUrl})` }}
                    ></div>
                  </div>
                ))}
              </div>
              {/* Add Images Button */}
              <div>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <FontAwesomeIcon icon={faCloudUploadAlt} />
                  <p>Drag and Drop/Click to select images</p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    handleAddImage(
                      editedProject,
                      categoryIndex,
                      uploadedImages,
                      setUploadedImages,
                      setLoadingCategories
                    )
                  }
                  disabled={loadingCategories[categoryIndex]}
                  className="bg-blue-500 text-white rounded-md px-2 py-1 hover:bg-blue-600"
                >
                  {loadingCategories[categoryIndex]
                    ? "Adding Images..."
                    : "Add Images"}
                </button>
              </div>
              {/* Delete Category Button */}
              <button
                type="button"
                onClick={() =>
                  setEditedProject(
                    handleDeleteCategory(editedProject, categoryIndex)
                  )
                }
                className="bg-red-500 text-white rounded-md px-2 py-1 mt-2 hover:bg-red-600"
              >
                Delete Category
              </button>
            </div>
          ))}

        {/* Button to add category */}
        <div className="flex space-x-2 mt-4">
          <input
            type="text"
            placeholder="New Category Name"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
          />
          <button
            type="button"
            onClick={() =>
              setEditedProject(
                handleAddCategory(editedProject, newCategoryName)
              )
            }
            className="bg-green-500 text-white rounded-md px-2 py-1 hover-bg-green-600"
          >
            Add Category
          </button>
        </div>

        {/* Button to submit the edited project */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600"
          >
            Save Changes
          </button>
        </div>
      </form>
    </RouteCheck>
  );
}

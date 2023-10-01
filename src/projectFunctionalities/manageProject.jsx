"use client";
//fetch a single project
export async function fetchProject(projectId) {
  try {
    const response = await fetch(`http://localhost:3000/api/${projectId}`, {
      method: "GET",
    });
    if (response.ok) {
      const projectData = await response.json();
      return projectData.project;
    } else {
      console.error("Error fetching project: " + response.status);
    }
  } catch (error) {
    console.error(error);
  }
}
//fetch all projects
export async function fetchProjects() {
  try {
    const response = await fetch("http://localhost:3000/api", {
      method: "GET",
    });
    if (response.ok) {
      const projectsData = await response.json();
      return projectsData.projects;
    } else {
      console.error("Error fetching projects: " + response.status);
    }
  } catch (err) {
    console.error(err);
  }
}
//delete a project
export async function deleteProject(projectId) {
  try {
    const response = await fetch(`http://localhost:3000/api/${projectId}`, {
      method: "DELETE",
    });
    if (response.ok) {
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error deleting project " + error);
  }
}

//category related functions
export function handleDeleteCategory(editedProject, categoryIndex) {
  const updatedCategories = [...editedProject.categories];
  console.log(editedProject)
  updatedCategories.splice(categoryIndex, 1);
  return { ...editedProject, categories: updatedCategories };
}

export function handleAddCategory(editedProject, newCategoryName) {
  console.log(editedProject)
  const newCategory = { name: newCategoryName, imageUrls: [] };
  return {
    ...editedProject,
    categories: [...editedProject.categories, newCategory],
  };
}

export function handleUpdateCategory(
  editedProject,
  categoryIndex,
  newCategoryName
) {
  const updatedCategories = [...editedProject.categories];
  updatedCategories[categoryIndex].name = newCategoryName;
  return { ...editedProject, categories: updatedCategories };
}

//image related functions
export function handleDeleteImage(editedProject, categoryIndex, imageIndex) {
  const updatedCategories = [...editedProject.categories];
  updatedCategories[categoryIndex].imageUrls.splice(imageIndex, 1);
  return { ...editedProject, categories: updatedCategories };
}

export async function handleAddImage(
  editedProject,
  categoryIndex,
  uploadedImages,
  setUploadedImages,
  setLoadingCategories
) {
  const updatedCategories = [...editedProject.categories];
  setLoadingCategories((prevLoadingCategories) => {
    const updatedLoadingCategories = [...prevLoadingCategories];
    updatedLoadingCategories[categoryIndex] = true;
    return updatedLoadingCategories;
  });

  try {
    const imageUploadPromises = await Promise.all(
      uploadedImages.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", process.env.NEXT_PUBLIC_UPLOAD_PRESET);
        const imageUploadResponse = await fetch(
          process.env.NEXT_PUBLIC_IMAGE_FETCH_LINK,
          {
            method: "POST",
            body: formData,
          }
        );
        if (imageUploadResponse.ok) {
          const imgData = await imageUploadResponse.json();
          const imageURL = imgData.secure_url;
          updatedCategories[categoryIndex].imageUrls.push(imageURL);
        } else {
          console.error("Error uploading image:", imageUploadResponse.status);
        }
      })
    );

    setLoadingCategories((prevLoadingCategories) => {
      const updatedLoadingCategories = [...prevLoadingCategories];
      updatedLoadingCategories[categoryIndex] = false;
      return updatedLoadingCategories;
    });

    setUploadedImages([]);

    const updatedProject = { ...editedProject, categories: updatedCategories };
    return updatedProject;
  } catch (error) {
    console.error("Error uploading images: " + error);
  }
}

//project attributes realated functions
export function handleTitleChange(editedProject, newTitle) {
  return { ...editedProject, title: newTitle };
}

export function handleDescriptionChange(editedProject, newDescription) {
  return { ...editedProject, description: newDescription };
}

//submit the form
export async function handleSubmit(editedProject) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/${editedProject._id}`,
      {
        method: "PUT",
        body: JSON.stringify(editedProject),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      console.log("Project edited successfully");
      alert("Changes have been successfully saved");
      //redirect
    } else {
      console.error("Error editing project: ", response.status);
    }
  } catch (error) {
    console.error("Error editing project: ", error);
  }
}

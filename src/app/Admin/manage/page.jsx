"use client";
import React, { useEffect, useState } from "react";
import RouteCheck from "@/components/RouteCheck";
import Link from "next/link";
import {
  fetchProjects,
  deleteProject,
} from "@/projectFunctionalities/manageProject";
function page() {
  const [projectItems, setProjectItems] = useState([]);
  useEffect(() => {
    async function fetchProjectsData() {
      const projectsData = await fetchProjects();
      setProjectItems(projectsData);
    }
    fetchProjectsData();
  }, []);
  async function deleteProjectItem(projectId) {
    const success = await deleteProject(projectId);
    if (success) {
      const updatedProjects = await fetchProjects();
      setProjectItems(updatedProjects);
    }
    else{
      console.log("Error deleting project")
    }
  }
  return (
    <RouteCheck>
      <h1 className="text-3xl font-semibold mb-4">Manage Projects</h1>
      <ul>
        {projectItems.map((project) => (
          <li
            key={project._id}
            className="flex items-center justify-between py-2 border-b border-gray-300"
          >
            <h2 className="text-xl">{project.title}</h2>
            <div className="space-x-2">
              {/* Use Link to navigate to the edit page */}
              <Link
                href={`/Admin/manage/${project._id}`}
                className="text-blue-500 hover:underline"
              >
                Edit
              </Link>
              <button
                onClick={() => deleteProjectItem(project._id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </RouteCheck>
  );
}

export default page;

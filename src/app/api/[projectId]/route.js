import Project from "@/models/project";
import connectMongoDB from "@/libs/mongodb";
import { NextResponse } from "next/server";
// get  a single project by id at ["http://localhost:3000/api/projectId"]
export async function GET(request, { params }) {
  try {
    const { projectId } = params;
    await connectMongoDB();
    const project = await Project.findById(projectId);
    //console.log(project);
    if (project === null) {
      const notFoundResponse = new Response(
        JSON.stringify({ message: "Project not found" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
      return notFoundResponse;
    }

    return NextResponse.json({ project }, { status: 200 });
  } catch (error) {
    console.error(error); 
    return NextResponse.error({ statusCode: 500, message: error.message });
  }
}

// delete a single project by id at ["http://localhost:3000/api/projectId"]
export async function DELETE(request, { params }) {
  try {
    const { projectId } = params;
    await connectMongoDB();
    const deletedProject = await Project.findByIdAndRemove(projectId);
    //console.log(deletedProject);
    if (deletedProject === null) {
      const notFoundResponse = new Response(
        JSON.stringify({ message: "Project not found" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
      return notFoundResponse;
    }

    return NextResponse.json({ deletedProject }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.error({ statusCode: 500, message: error.message });
  }
}

// update a single project by id at ["http://localhost:3000/api/projectId"]
export async function PUT(request, { params }) {
  try {
    const { projectId } = params;
    const updatedProjectData = await request.json()
    //console.log("Update project data: ",updatedProjectData)
    await connectMongoDB();
    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      updatedProjectData,
      { new: true } // This option ensures that the updated document is returned
    );
    if (updatedProject === null) {
      const notFoundResponse = new Response(
        JSON.stringify({ message: "Project not found" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
      return notFoundResponse;
    }
    //console.log("Updated project: ",updatedProject)
    return NextResponse.json(updatedProject, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.error({ statusCode: 500, message: error.message });
  }
}

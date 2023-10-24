import { NextResponse } from "next/server";
import Project from "@/models/project";
import connectMongoDB from "@/libs/mongodb";
import FormData from 'form-data';

export async function POST(request) {
  try {
    if (request.method !== "POST") {
      return NextResponse.error({
        statusCode: 405,
        message: "Method not allowed",
      });
    }

    const { title, description, categories } = await request.json();
    await connectMongoDB();
    // Check if a project with the same title already exists
    const existingProject = await Project.findOne({ title });
    if (existingProject) {
      return NextResponse.error({
        statusCode: 400,
        message: "Project with the same name already exists",
      });
    }

    const project = new Project({
      title,
      description,
      categories,
    });

    const savedProject = await project.save();

    return NextResponse.json(savedProject, { status: 201 }); // 201 Created
  } catch (error) {
    console.error(error);
    return NextResponse.error({ statusCode: 500, message: "Server Error" });
  }
}

//get all the projects at ["http://localhost:3000/api"]
export async function GET() {
  try {
    await connectMongoDB();
    const projects = await Project.find();
    return NextResponse.json({ projects }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.error({ statusCode: 500, message: error.message });
  }
}

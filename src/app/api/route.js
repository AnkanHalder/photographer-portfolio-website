import { NextResponse } from "next/server";
import Project from "@/models/project";
import connectMongoDB from "@/libs/mongodb";


export async function POST(request) {
  try {
    if (request.method !== "POST") {
      return NextResponse.json({
        message: "Method not allowed",
      });
    }

    const { title, description, categories,thumbnail } = await request.json();
    console.log(title, description, categories,thumbnail);
    await connectMongoDB();
    // Check if a project with the same title already exists
    const existingProject = await Project.findOne({ title });
    if (existingProject) {
      return NextResponse.json({
        message: "Project with the same name already exists",
      });
    }

    const project = new Project({
      title,
      description,
      thumbnail,
      categories,
    });

    const savedProject = await project.save();

    return NextResponse.json(savedProject); // 201 Created
  } catch (error) {
    console.error(error);
    return NextResponse.json({  message: "Server Error" });
  }
}

//get all the projects at ["http://localhost:3000/api"]
export async function GET() {
  try {
    await connectMongoDB();
    const projects = await Project.find();
    return NextResponse.json({ success: true, data: projects});
  } catch (error) {
    console.error(error);
    return NextResponse.json({success: false, data: []});
  }
}

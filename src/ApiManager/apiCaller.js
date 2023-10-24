import axios from "axios";

export class ApiCaller {
    static async uploadToCloudinary(imageData){
        const response = await axios.post(process.env.NEXT_PUBLIC_IMAGE_FETCH_LINK,imageData);
        return response.data;
    }
    static async addProject(projectData){
        const response = await axios.post("/api",projectData);
        return response.data;
    }
}
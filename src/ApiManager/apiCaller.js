import axios from "axios";

export class ApiCaller {
    static async addProject(projectData){
        const response = await axios.post("/api",projectData);
        console.log(response.data);
        return response.data;
    }
}
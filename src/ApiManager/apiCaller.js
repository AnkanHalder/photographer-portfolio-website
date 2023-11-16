import axios from "axios";

export class ApiCaller {
    static async uploadToCloudinary(imageData){
        const response = await axios.post(process.env.NEXT_PUBLIC_IMAGE_FETCH_LINK,imageData);
        if(response.statusText == "OK"){
            return {
                success: true,
                data: response.data
            }
        }
        return {
            success: false,
            data: null
        }
    }
    static async postGalleryImages(imageData){
        const response = await axios.post("/api/gallery",imageData);
        return response.data;
    }
    static async getGalleryImages(imageData){
        const response = await axios.get("/api/gallery",imageData);
        if(response.data.success) return response.data.data
        else return [];
    }
    static async deleteImageFromDatabase(imageData){
        const response = await axios.post("/api/removeImage",imageData);
        return response.data;
    }
    static async addProject(projectData){
        const response = await axios.post("/api",projectData);
        return response.data;
    }
    static async addReview(reviewData){
        const response = await axios.post("/api/review",reviewData);
        return response.data;
    }
    static async getReviews(){
        const response = await axios.get("/api/review");
        if (response.data.success) return response.data.data;
        else return [];
    }
}
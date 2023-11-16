import connectMongoDB from "@/libs/mongodb";
import GalleryImage from "@/models/GalleryImage";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connectMongoDB();
        const imageData = await req.json();
        const savedImage = await GalleryImage.create(imageData);
        console.log(savedImage);
        return NextResponse.json({ success: true, data: savedImage});
    } catch (err) {
        console.error(err);
        return NextResponse.json({ success:false, data:null});
    }
}

export async function GET(req) {
    try {
        await connectMongoDB();
        const images = await GalleryImage.find();
        return NextResponse.json({ success: true, data: images });
    } catch (err) {
        console.error("Error fetching images:", err);
        return NextResponse.json({ success: false, data:null});
    }
}
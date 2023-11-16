import connectMongoDB from '@/libs/mongodb';
import GalleryImage from '@/models/GalleryImage';
import cloudinary from 'cloudinary';
import { NextResponse } from 'next/server';

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_API_KEY,
    api_secret: process.env.NEXT_PUBLIC_API_SECRET,
});

export async function POST(req){
    try {
        await connectMongoDB()
        const {public_id,id} = await req.json();
        await cloudinary.uploader.destroy(public_id);
        await GalleryImage.findByIdAndDelete(id);
        return NextResponse.json({success: true, message: "Successfully Deleted" });
      } catch (error) {
        return NextResponse.json({success: false, message: "Deletion Unsuccessfull \n ", error: error});
      }
}
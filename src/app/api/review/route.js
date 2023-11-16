import connectMongoDB from "@/libs/mongodb";
import Review from "@/models/review";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connectMongoDB();
        const review = await req.json();
        const savedReview = await Review.create(review);
        return NextResponse.json({ success: true, data: savedReview });
    } catch (err) {
        return NextResponse.json({ success:false, data:null});
    }
}

export async function GET(req) {
    try {
        await connectMongoDB();
        const reviews = await Review.find();
        return NextResponse.json({ success: true, data: reviews });
    } catch (err) {
        console.error("Error fetching reviews:", err);
        return NextResponse.json({ success: false, data:null});
    }
}
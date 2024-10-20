import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from 'cloudinary';
import { ERROR_MESSAGES } from "@/lib/constants/messages";
import prisma from "@/lib/prisma"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});


const uploadMedia = async (file: string, folder = "") => {
    try {
        const uploaded = await cloudinary.uploader.upload(file, {
            folder: `/nextcommerce/${folder}`
        });
        const dbFile = await prisma.file.create({
            data: { url: uploaded.secure_url }
        })
        return dbFile
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function POST(request: NextRequest) {
    const body = await request.json()
    if (!body.file) {
        return NextResponse.json({
            message: ERROR_MESSAGES.BadRequestError
        }, { status: 400 });
    }

    // const id = req.params.id
    // const data = await CloudinaryService.deleteMedia(id)
    const data = await uploadMedia(body.file, body.folder)
    return NextResponse.json(data, { status: 200 });
}
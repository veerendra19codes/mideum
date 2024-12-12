import { NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { paramsToSign } = body

        // Generate signature
        const signature = cloudinary.utils.api_sign_request(
            paramsToSign,
            process.env.CLOUDINARY_API_SECRET as string
        )
        console.log("signature:", signature);

        return NextResponse.json({ signature })
    } catch (error) {
        console.error("Error generating signature:", error)
        return NextResponse.json({ error: "Failed to generate signature" }, { status: 500 })
    }
}

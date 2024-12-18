import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { userId, postId } = await req.json();

        const likedPost = await prisma.mLikes.create({
            data: {
                userId,
                postId
            }
        })
        console.log("likedPost:", likedPost);

        return NextResponse.json({ message: "post liked", likedPost });
    } catch (error) {
        console.log("error in liking:", error);
    }
}